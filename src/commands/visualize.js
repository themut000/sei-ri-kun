import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export async function visualizeProject(options) {
  const { path: projectPath, ignore = [] } = options;
  
  console.log(chalk.blue(`プロジェクト構造の可視化: ${projectPath}`));
  console.log();

  try {
    await scanDirectory(projectPath, '', ignore);
  } catch (error) {
    console.error(chalk.red('エラーが発生しました:'), error.message);
    process.exit(1);
  }
}

async function scanDirectory(dirPath, prefix, ignore) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    // 無視パターンのチェック
    if (ignore.some(pattern => entry.name.match(pattern))) {
      continue;
    }

    // .gitディレクトリは無視
    if (entry.name === '.git') {
      continue;
    }

    const isLast = entry === entries[entries.length - 1];
    const connector = isLast ? '└── ' : '├── ';
    
    console.log(`${prefix}${connector}${entry.name}`);

    if (entry.isDirectory()) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      await scanDirectory(fullPath, newPrefix, ignore);
    }
  }
} 