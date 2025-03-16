npm version minor
npm run build:gh
git add --all
git commit --amend --no-edit
git checkout master
git merge develop
git checkout develop