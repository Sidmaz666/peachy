module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: '> 0.25%, not dead'
      }
    ],
    [
      '@babel/preset-react',
      {
        // Transpile JSX to Peachy.createElement calls.
        pragma: 'Peachy.createElement',
        runtime: 'classic'
      }
    ]
  ]
};

