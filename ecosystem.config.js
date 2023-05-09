module.exports = {
  apps: [{
    name: 'mainlibapp',
    exec_mode: 'cluster',
    port: 2800,
    instances: 'max', // sesuaikan dengan core atau bisa isi max untuk menggunakan semua core
    script: './.output/server/index.mjs'
  }]
}
