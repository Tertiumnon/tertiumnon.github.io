npm version patch
npm run build:gh
git add --all
git commit --amend --no-edit
git push -f
git push --tags
git checkout develop
git rebase origin/master
git push
git checkout master
