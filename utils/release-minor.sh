npm version minor &&
npm run build:gh &&
git add --all &&
git commit --amend --no-edit &&
git push -f &&
git checkout master &&
git pull &&
git merge develop &&
git push &&
git push --tags &&
git checkout develop