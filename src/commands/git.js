import simpleGit from 'simple-git';
import chalk from 'chalk';

export async function gitStatus(options) {
  const { path: repoPath } = options;
  const git = simpleGit(repoPath);

  try {
    // 現在のブランチ情報を取得
    const branchSummary = await git.branch();
    console.log(chalk.blue('現在のブランチ:'), chalk.green(branchSummary.current));

    // 直近のコミット情報を取得
    const logSummary = await git.log(['-1']);
    if (logSummary.latest) {
      console.log(chalk.blue('最新のコミット:'));
      console.log(chalk.yellow('  Hash:'), logSummary.latest.hash);
      console.log(chalk.yellow('  日時:'), new Date(logSummary.latest.date).toLocaleString());
      console.log(chalk.yellow('  メッセージ:'), logSummary.latest.message);
    }

    // 変更状態を取得
    const status = await git.status();
    console.log(chalk.blue('\n変更状態:'));
    
    if (status.modified.length > 0) {
      console.log(chalk.yellow('変更されたファイル:'));
      status.modified.forEach(file => console.log(`  ${file}`));
    }
    
    if (status.not_added.length > 0) {
      console.log(chalk.red('未追跡のファイル:'));
      status.not_added.forEach(file => console.log(`  ${file}`));
    }
    
    if (status.staged.length > 0) {
      console.log(chalk.green('ステージングされたファイル:'));
      status.staged.forEach(file => console.log(`  ${file}`));
    }

  } catch (error) {
    console.error(chalk.red('エラーが発生しました:'), error.message);
    process.exit(1);
  }
} 