module.exports = {
  apps: [{
    name: 'tokopay-admin',
    exec_mode: 'cluster',
    port: 5001,
    instances: 'max', // sesuaikan dengan core atau bisa isi max untuk menggunakan semua core
    script: './.output/server/index.mjs'
  }]
}
