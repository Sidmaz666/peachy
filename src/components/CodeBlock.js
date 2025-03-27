import { Peachy } from "@peach/component";


export default function CodeBlock({ code, language = 'jsx' }) {
    return (
      <div className="relative overflow-hidden rounded-lg">
        <div className="absolute top-0 left-0 right-0 h-9 bg-muted border-b border-border flex items-center px-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="ml-4 text-xs font-medium text-muted-foreground">
            {language}
          </div>
        </div>
        <pre className="bg-muted/30 backdrop-blur-sm text-sm mt-9 p-4 overflow-x-auto">
          <code className="font-mono text-foreground">{code}</code>
        </pre>
      </div>
    );
  }
  