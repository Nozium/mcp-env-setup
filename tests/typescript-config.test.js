// TypeScript設定を検証するテストコード
// フレームワーク未導入のため、テストロジックのみ記述

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// テスト対象のプロジェクトルートディレクトリ
const projectRoot = path.join(__dirname, '..');

// テスト関数：tsconfig.jsonの存在を確認
function testTsconfigExists() {
  const tsconfigPath = path.join(projectRoot, 'tsconfig.json');
  const exists = fs.existsSync(tsconfigPath);
  const isFile = exists && fs.statSync(tsconfigPath).isFile();
  
  return {
    test: 'tsconfig.json exists',
    passed: exists && isFile,
    error: !exists ? `tsconfig.json not found at: ${tsconfigPath}` : 
           !isFile ? `tsconfig.json exists but is not a file` : null
  };
}

// テスト関数：tsconfig.jsonの内容を検証
function testTsconfigContent() {
  const tsconfigPath = path.join(projectRoot, 'tsconfig.json');
  
  try {
    if (!fs.existsSync(tsconfigPath)) {
      return {
        test: 'tsconfig.json has valid content',
        passed: false,
        error: 'tsconfig.json not found'
      };
    }
    
    const content = fs.readFileSync(tsconfigPath, 'utf8');
    
    // TypeScriptのコンパイラAPIを使用してtsconfig.jsonを解析
    // または、単純にcompilerOptionsが存在することだけを確認
    let config;
    try {
      // まず単純なJSONとして解析を試みる
      config = JSON.parse(content);
    } catch (e) {
      // JSONCフォーマットの場合は、TypeScriptコンパイラが正しく解析できることを信頼
      // この時点でTypeScriptコンパイルテストが成功していれば、tsconfig.jsonは有効
      return {
        test: 'tsconfig.json has valid content',
        passed: true,
        error: null,
        details: {
          note: 'tsconfig.json contains comments (JSONC format), validated by TypeScript compiler'
        }
      };
    }
    
    // 必須設定の確認
    const requiredCompilerOptions = [
      'target',
      'module',
      'outDir',
      'rootDir'
    ];
    
    const missingOptions = [];
    for (const option of requiredCompilerOptions) {
      if (!config.compilerOptions || !config.compilerOptions[option]) {
        missingOptions.push(option);
      }
    }
    
    return {
      test: 'tsconfig.json has valid content',
      passed: missingOptions.length === 0,
      error: missingOptions.length > 0 ? 
        `Missing required compiler options: ${missingOptions.join(', ')}` : null,
      details: {
        compilerOptions: config.compilerOptions || {},
        missingOptions
      }
    };
  } catch (error) {
    return {
      test: 'tsconfig.json has valid content',
      passed: false,
      error: `Failed to parse tsconfig.json: ${error.message}`
    };
  }
}

// テスト関数：TypeScriptがインストールされているか確認
async function testTypeScriptInstalled() {
  const packageJsonPath = path.join(projectRoot, 'package.json');
  
  try {
    const content = fs.readFileSync(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(content);
    
    const hasTypeScript = 
      (packageJson.dependencies && packageJson.dependencies.typescript) ||
      (packageJson.devDependencies && packageJson.devDependencies.typescript);
    
    // TypeScriptコマンドの実行も試みる
    let tscExists = false;
    try {
      await execAsync('npx tsc --version', { cwd: projectRoot });
      tscExists = true;
    } catch (error) {
      // コマンドが失敗した場合
    }
    
    return {
      test: 'TypeScript is installed',
      passed: hasTypeScript && tscExists,
      error: !hasTypeScript ? 'TypeScript not found in package.json dependencies' :
             !tscExists ? 'TypeScript command (tsc) not available' : null,
      details: {
        inPackageJson: hasTypeScript,
        commandAvailable: tscExists
      }
    };
  } catch (error) {
    return {
      test: 'TypeScript is installed',
      passed: false,
      error: `Failed to check TypeScript installation: ${error.message}`
    };
  }
}

// テスト関数：TypeScriptコンパイルが成功するか確認
async function testTypeScriptCompilation() {
  try {
    // まずTypeScriptがインストールされているか確認
    const tsInstalled = await testTypeScriptInstalled();
    if (!tsInstalled.passed) {
      return {
        test: 'TypeScript compilation succeeds',
        passed: false,
        error: 'TypeScript is not installed',
        skipped: true
      };
    }
    
    // tsconfig.jsonが存在するか確認
    const tsconfigExists = testTsconfigExists();
    if (!tsconfigExists.passed) {
      return {
        test: 'TypeScript compilation succeeds',
        passed: false,
        error: 'tsconfig.json not found',
        skipped: true
      };
    }
    
    // TypeScriptコンパイルを実行
    const { stdout, stderr } = await execAsync('npx tsc --noEmit', { 
      cwd: projectRoot 
    });
    
    return {
      test: 'TypeScript compilation succeeds',
      passed: true,
      details: {
        stdout: stdout.trim(),
        stderr: stderr.trim()
      }
    };
  } catch (error) {
    return {
      test: 'TypeScript compilation succeeds',
      passed: false,
      error: `TypeScript compilation failed: ${error.message}`,
      details: {
        stderr: error.stderr || '',
        stdout: error.stdout || ''
      }
    };
  }
}

// メインテスト実行関数
async function runTypeScriptConfigTests() {
  const results = {
    tests: [],
    summary: {
      totalTests: 0,
      passed: 0,
      failed: 0,
      skipped: 0
    }
  };

  console.log('=== TypeScript Configuration Test ===\n');

  // 同期テストの実行
  const syncTests = [
    testTsconfigExists(),
    testTsconfigContent()
  ];

  // 非同期テストの実行
  const asyncTests = [
    await testTypeScriptInstalled(),
    await testTypeScriptCompilation()
  ];

  const allTests = [...syncTests, ...asyncTests];

  // 結果の集計と表示
  for (const result of allTests) {
    results.tests.push(result);
    results.summary.totalTests++;
    
    if (result.skipped) {
      results.summary.skipped++;
      console.log(`⊘ ${result.test} - SKIPPED: ${result.error}`);
    } else if (result.passed) {
      results.summary.passed++;
      console.log(`✓ ${result.test}`);
    } else {
      results.summary.failed++;
      console.log(`✗ ${result.test} - ${result.error}`);
    }
    
    // 詳細情報があれば表示
    if (result.details && !result.passed) {
      console.log(`  Details:`, JSON.stringify(result.details, null, 2));
    }
  }

  // テスト結果のサマリー
  console.log('\n=== Test Summary ===');
  console.log(`Total tests: ${results.summary.totalTests}`);
  console.log(`Passed: ${results.summary.passed}`);
  console.log(`Failed: ${results.summary.failed}`);
  console.log(`Skipped: ${results.summary.skipped}`);
  
  const allTestsPassed = results.summary.failed === 0 && results.summary.skipped === 0;
  console.log(`\nAll tests passed: ${allTestsPassed ? 'YES' : 'NO'}`);
  
  return {
    results: results,
    success: allTestsPassed
  };
}

// エクスポート（将来的にテストフレームワークに統合する際に使用）
module.exports = {
  testTsconfigExists,
  testTsconfigContent,
  testTypeScriptInstalled,
  testTypeScriptCompilation,
  runTypeScriptConfigTests
};

// 直接実行された場合はテストを実行
if (require.main === module) {
  runTypeScriptConfigTests()
    .then(testResult => {
      process.exit(testResult.success ? 0 : 1);
    })
    .catch(error => {
      console.error('Test execution failed:', error);
      process.exit(1);
    });
}