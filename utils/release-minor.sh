npm version minor &&
npm run build:gh &&
git add --all &&
git commit --amend -C HEAD &&
git push &&
git checkout master &&
git pull &&
git merge develop &&
git push &&
git push --tags &&
git checkout develop &&
