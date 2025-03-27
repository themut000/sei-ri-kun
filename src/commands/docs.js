import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { marked } from 'marked';

export async function generateDocs(options) {
  const { path: projectPath, output: outputPath } = options;

  try {
    // 出力ディレクトリの作成
    await fs.ensureDir(outputPath);

    // プロジェクト構造の解析
    const structure = await analyzeProjectStructure(projectPath);
    
    // ドキュメントの生成
    await generateProjectDocs(structure, outputPath);
    
    console.log(chalk.green('ドキュメントの生成が完了しました！'));
  } catch (error) {
    console.error(chalk.red('エラーが発生しました:'), error.message);
    process.exit(1);
  }
}

async function analyzeProjectStructure(projectPath) {
  const structure = {
    name: path.basename(projectPath),
    files: [],
    directories: [],
    dependencies: {},
    technologies: new Set()
  };

  const entries = await fs.readdir(projectPath, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === 'node_modules') {
      continue;
    }

    const fullPath = path.join(projectPath, entry.name);
    
    if (entry.isDirectory()) {
      structure.directories.push({
        name: entry.name,
        path: fullPath
      });
    } else {
      structure.files.push({
        name: entry.name,
        path: fullPath
      });
    }
  }

  // package.jsonの解析
  const packageJsonPath = path.join(projectPath, 'package.json');
  if (await fs.pathExists(packageJsonPath)) {
    const packageJson = await fs.readJson(packageJsonPath);
    structure.dependencies = packageJson.dependencies || {};
    structure.technologies.add('Node.js');
  }

  return structure;
}

async function generateProjectDocs(structure, outputPath) {
  // README.mdの生成
  const readmeContent = generateReadme(structure);
  await fs.writeFile(path.join(outputPath, 'README.md'), readmeContent);

  // プロジェクト構造のドキュメント
  const structureContent = generateStructureDoc(structure);
  await fs.writeFile(path.join(outputPath, 'STRUCTURE.md'), structureContent);
}

function generateReadme(structure) {
  return `# ${structure.name}

## プロジェクト概要
このプロジェクトは、プロジェクト構成の可視化とドキュメント作成を支援するツールです。

## 技術スタック
${Array.from(structure.technologies).map(tech => `- ${tech}`).join('\n')}

## 依存関係
${Object.entries(structure.dependencies)
  .map(([name, version]) => `- ${name}: ${version}`)
  .join('\n')}

## プロジェクト構造
詳細な構造については、[STRUCTURE.md](./STRUCTURE.md)を参照してください。
`;
}

function generateStructureDoc(structure) {
  return `# プロジェクト構造

## ディレクトリ構成
${structure.directories.map(dir => `- \`${dir.name}/\``).join('\n')}

## 主要ファイル
${structure.files.map(file => `- \`${file.name}\``).join('\n')}

## 技術スタック
${Array.from(structure.technologies).map(tech => `- ${tech}`).join('\n')}

## 依存関係
${Object.entries(structure.dependencies)
  .map(([name, version]) => `- ${name}: ${version}`)
  .join('\n')}
`;
} 