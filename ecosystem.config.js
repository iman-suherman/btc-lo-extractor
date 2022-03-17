module.exports = {
    apps: [
        {
            name: 'api',
            cwd: '/home/ubuntu/api',
            script: './startup.sh',
            autorestart: true,
            watch: false,
            combine_logs: true,
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
