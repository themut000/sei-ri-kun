#!/usr/bin/env node

import { program } from 'commander';
import { visualizeProject } from './commands/visualize.js';
import { gitStatus } from './commands/git.js';
import { generateDocs } from './commands/docs.js';
import chalk from 'chalk';

program
  .name('整理くん')
  .description('プロジェクト構成可視化・ドキュメント作成支援ツール')
  .version('1.0.0');

program
  .argument('[path]', '解析したいパス', '.')
  .option('-i, --ignore <patterns...>', '無視するファイルパターン')
  .option('-g, --git', 'Gitの状態も表示')
  .option('-d, --docs', 'ドキュメントを生成')
  .option('-o, --output <path>', 'ドキュメントの出力先ディレクトリ', './docs')
  .action(async (path, options) => {
    try {
      // プロジェクト構造の可視化
      console.log(chalk.blue(`\n📁 プロジェクト構造の可視化: ${path}\n`));
      await visualizeProject({ path, ignore: options.ignore });

      // Gitの状態表示（オプション）
      if (options.git) {
        console.log(chalk.blue('\n📊 Gitの状態\n'));
        await gitStatus({ path });
      }

      // ドキュメント生成（オプション）
      if (options.docs) {
        console.log(chalk.blue('\n📝 ドキュメント生成\n'));
        await generateDocs({ path, output: options.output });
      }

      console.log(chalk.green('\n✨ 処理が完了しました！\n'));
    } catch (error) {
      console.error(chalk.red('エラーが発生しました:'), error.message);
      process.exit(1);
    }
  });

program.parse(); 