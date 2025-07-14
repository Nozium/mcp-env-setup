// Jest設定を検証するテストコード
// フレームワーク未導入のため、テストロジックのみ記述

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// テスト対象のプロジェクトルートディレクトリ
const projectRoot = path.join(__dirname, '..');

// テスト関数：jest.config.jsの存在を確認
function testJestConfigExists() {
  const jestConfigPath = path.join(projectRoot, 'jest.config.js');
  const exists = fs.existsSync(jestConfigPath);
  const isFile = exists && fs.statSync(jestConfigPath).isFile();
  
  return {
    test: 'jest.config.js exists',
    passed: exists && isFile,
    error: !exists ? `jest.config.js not found at: ${jestConfigPath}` : 
           !isFile ? `jest.config.js exists but is not a file` : null
  };
}

// テスト関数：Jestがインストールされているか確認
async function testJestInstalled() {
  const packageJsonPath = path.join(projectRoot, 'package.json');
  
  try {
    const content = fs.readFileSync(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(content);
    
    const hasJest = 
      (packageJson.dependencies && packageJson.dependencies.jest) ||
      (packageJson.devDependencies && packageJson.devDependencies.jest);
    
    const hasTsJest = 
      (packageJson.dependencies && packageJson.dependencies['ts-jest']) ||
      (packageJson.devDependencies && packageJson.devDependencies['ts-jest']);
    
    const hasJestTypes = 
      (packageJson.dependencies && packageJson.dependencies['@types/jest']) ||
      (packageJson.devDependencies && packageJson.devDependencies['@types/jest']);
    
    // Jestコマンドの実行も試みる
    let jestExists = false;
    try {
      await execAsync('npx jest --version', { cwd: projectRoot });
      jestExists = true;
    } catch (error) {
      // コマンドが失敗した場合
    }
    
    const allPackagesInstalled = hasJest && hasTsJest && hasJestTypes;
    
    return {
      test: 'Jest and related packages are installed',
      passed: allPackagesInstalled && jestExists,
      error: !hasJest ? 'jest not found in package.json dependencies' :
             !hasTsJest ? 'ts-jest not found in package.json dependencies' :
             !hasJestTypes ? '@types/jest not found in package.json dependencies' :
             !jestExists ? 'Jest command not available' : null,
      details: {
        jest: hasJest,
        'ts-jest': hasTsJest,
        '@types/jest': hasJestTypes,
        commandAvailable: jestExists
      }
    };
  } catch (error) {
    return {
      test: 'Jest and related packages are installed',
      passed: false,
      error: `Failed to check Jest installation: ${error.message}`
    };
  }
}

// テスト関数：jest.config.jsの内容を検証
async function testJestConfigContent() {
  const jestConfigPath = path.join(projectRoot, 'jest.config.js');
  
  try {
    if (!fs.existsSync(jestConfigPath)) {
      return {
        test: 'jest.config.js has valid content',
        passed: false,
        error: 'jest.config.js not found'
      };
    }
    
    // jest.config.jsを動的にインポート
    delete require.cache[jestConfigPath]; // キャッシュをクリア
    const jestConfig = require(jestConfigPath);
    
    // 必須設定の確認
    const requiredSettings = {
      preset: 'ts-jest',
      testEnvironment: 'node'
    };
    
    const missingSettings = [];
    for (const [key, expectedValue] of Object.entries(requiredSettings)) {
      if (jestConfig[key] !== expectedValue) {
        missingSettings.push(`${key} should be '${expectedValue}' but is '${jestConfig[key]}'`);
      }
    }
    
    // TypeScript関連の設定確認
    const hasTransform = jestConfig.transform && 
      (jestConfig.transform['^.+\\.tsx?$'] || jestConfig.transform['^.+\\.(ts|tsx)$']);
    if (!hasTransform) {
      missingSettings.push('TypeScript transform configuration is missing');
    }
    
    return {
      test: 'jest.config.js has valid content',
      passed: missingSettings.length === 0,
      error: missingSettings.length > 0 ? 
        `Configuration issues: ${missingSettings.join(', ')}` : null,
      details: {
        config: jestConfig,
        missingSettings
      }
    };
  } catch (error) {
    return {
      test: 'jest.config.js has valid content',
      passed: false,
      error: `Failed to load jest.config.js: ${error.message}`
    };
  }
}

// テスト関数：テストファイルが実行可能か確認
async function testJestExecution() {
  try {
    // まずJestがインストールされているか確認
    const jestInstalled = await testJestInstalled();
    if (!jestInstalled.passed) {
      return {
        test: 'Jest can execute tests',
        passed: false,
        error: 'Jest is not properly installed',
        skipped: true
      };
    }
    
    // jest.config.jsが存在するか確認
    const jestConfigExists = testJestConfigExists();
    if (!jestConfigExists.passed) {
      return {
        test: 'Jest can execute tests',
        passed: false,
        error: 'jest.config.js not found',
        skipped: true
      };
    }
    
    // サンプルテストファイルが存在するか確認
    const sampleTestPath = path.join(projectRoot, 'src', '__tests__', 'sample.test.ts');
    if (!fs.existsSync(sampleTestPath)) {
      return {
        test: 'Jest can execute tests',
        passed: false,
        error: `Sample test file not found at: ${sampleTestPath}`,
        details: {
          note: 'Create a sample test file to verify Jest execution'
        }
      };
    }
    
    // Jestを実行
    const { stdout, stderr } = await execAsync('npx jest --passWithNoTests', { 
      cwd: projectRoot 
    });
    
    return {
      test: 'Jest can execute tests',
      passed: true,
      details: {
        stdout: stdout.trim(),
        stderr: stderr.trim()
      }
    };
  } catch (error) {
    return {
      test: 'Jest can execute tests',
      passed: false,
      error: `Jest execution failed: ${error.message}`,
      details: {
        stderr: error.stderr || '',
        stdout: error.stdout || ''
      }
    };
  }
}

// メインテスト実行関数
async function runJestConfigTests() {
  const results = {
    tests: [],
    summary: {
      totalTests: 0,
      passed: 0,
      failed: 0,
      skipped: 0
    }
  };

  console.log('=== Jest Configuration Test ===\n');

  // テストの実行
  const tests = [
    testJestConfigExists(),
    await testJestInstalled(),
    await testJestConfigContent(),
    await testJestExecution()
  ];

  // 結果の集計と表示
  for (const result of tests) {
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
    if (result.details && !result.passed && !result.skipped) {
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
  testJestConfigExists,
  testJestInstalled,
  testJestConfigContent,
  testJestExecution,
  runJestConfigTests
};

// 直接実行された場合はテストを実行
if (require.main === module) {
  runJestConfigTests()
    .then(testResult => {
      process.exit(testResult.success ? 0 : 1);
    })
    .catch(error => {
      console.error('Test execution failed:', error);
      process.exit(1);
    });
}