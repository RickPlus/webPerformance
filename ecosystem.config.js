module.exports = {
  /**
   * pm2 start ecosystem.config.js --env production
   */
  apps: [

    // First application
    {
      name: 'webPerformance',
      script: 'npm',
      args: 'run start',
      // watch: ['.nuxt'],
      watch_options: {
        usePolling: true
      },
      env: {
        NODE_ENV: 'development',
        PORT: 3001,
        HOST: '0.0.0.0'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
        HOST: '0.0.0.0'
      }
    }
  ]
}
