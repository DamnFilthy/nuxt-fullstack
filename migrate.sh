echo "Start migrating"
eval cd app-server/sequelize
wait
eval npx sequelize-cli db:migrate
wait
echo "Migrating done"
eval exit
