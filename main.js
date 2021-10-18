const babel = require('@babel/core');
const plugin = require('./plugin.js');

const code = `
  @Component({
    selector: "app-alert",
    templateUrl: "./alert.component.html",
    styleUrls: ["./alert.component.css"],
  })
  export class AlertComponent extends ControlComponent {
    /** */
  }
`;

const output = babel.transformSync(code, {
    filename: 'file.ts',
    presets: ['@babel/preset-typescript'],
    plugins: [plugin,
        ["@babel/plugin-proposal-decorators", {
            "legacy": true
        }]
    ],
});

console.log(output.code);