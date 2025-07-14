// プロジェクト構造を検証するテストコード
// フレームワーク未導入のため、テストロジックのみ記述

const fs = require('fs');
const path = require('path');

// テスト対象のプロジェクトルートディレクトリ
const projectRoot = path.join(__dirname, '..');

// 検証すべきディレクトリとファイルの定義
const requiredStructure = {
  directories: [
    'src',
    'src/commands',
    'src/templates',
    'src/generators',
    'src/auth',
    'src/utils'
  ],
  files: [
    'src/index.ts'
  ]
};

// テスト関数：ディレクトリが存在することを検証
function testDirectoryExists(relativePath) {
  const fullPath = path.join(projectRoot, relativePath);
  const exists = fs.existsSync(fullPath);
  const isDirectory = exists && fs.statSync(fullPath).isDirectory();
  
  return {
    path: relativePath,
    exists: exists,
    isDirectory: isDirectory,
    passed: exists && isDirectory,
    error: !exists ? `Directory not found: ${fullPath}` : 
           !isDirectory ? `Path exists but is not a directory: ${fullPath}` : null
  };
}

// テスト関数：ファイルが存在することを検証
function testFileExists(relativePath) {
  const fullPath = path.join(projectRoot, relativePath);
  const exists = fs.existsSync(fullPath);
  const isFile = exists && fs.statSync(fullPath).isFile();
  
  return {
    path: relativePath,
    exists: exists,
    isFile: isFile,
    passed: exists && isFile,
    error: !exists ? `File not found: ${fullPath}` : 
           !isFile ? `Path exists but is not a file: ${fullPath}` : null
  };
}

// メインテスト実行関数
function runProjectStructureTests() {
  const results = {
    directories: [],
    files: [],
    summary: {
      totalTests: 0,
      passed: 0,
      failed: 0
    }
  };

  // ディレクトリの存在をテスト
  console.log('Testing directory structure...');
  for (const dir of requiredStructure.directories) {
    const result = testDirectoryExists(dir);
    results.directories.push(result);
    results.summary.totalTests++;
    if (result.passed) {
      results.summary.passed++;
      console.log(`✓ ${dir}`);
    } else {
      results.summary.failed++;
      console.log(`✗ ${dir} - ${result.error}`);
    }
  }

  // ファイルの存在をテスト
  console.log('\nTesting required files...');
  for (const file of requiredStructure.files) {
    const result = testFileExists(file);
    results.files.push(result);
    results.summary.totalTests++;
    if (result.passed) {
      results.summary.passed++;
      console.log(`✓ ${file}`);
    } else {
      results.summary.failed++;
      console.log(`✗ ${file} - ${result.error}`);
    }
  }

  // テスト結果のサマリー
  console.log('\n=== Test Summary ===');
  console.log(`Total tests: ${results.summary.totalTests}`);
  console.log(`Passed: ${results.summary.passed}`);
  console.log(`Failed: ${results.summary.failed}`);
  
  // 全てのテストが成功したかどうか
  const allTestsPassed = results.summary.failed === 0;
  console.log(`\nAll tests passed: ${allTestsPassed ? 'YES' : 'NO'}`);
  
  return {
    results: results,
    success: allTestsPassed
  };
}

// エクスポート（将来的にテストフレームワークに統合する際に使用）
module.exports = {
  testDirectoryExists,
  testFileExists,
  runProjectStructureTests,
  requiredStructure
};

// 直接実行された場合はテストを実行
if (require.main === module) {
  console.log('=== Project Structure Test ===\n');
  const testResult = runProjectStructureTests();
  
  // テストが失敗した場合は非ゼロの終了コードで終了
  process.exit(testResult.success ? 0 : 1);
}