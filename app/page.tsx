import Image from "next/image";
import { CodeBlock } from "@/components/ui/code-block";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-neutral-200 px-4 py-12">
      <div className="flex max-w-sm flex-col items-start gap-2">
        <div className="flex items-center gap-1">
          <Image src="/logo.svg" alt="" width={64} height={64} priority className="-ml-2" />
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-800">lmk</h1>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-neutral-600">Send me a text through this endpoint</p>
        </div>
        <CodeBlock
          code={`curl -X POST https://notify.asanshay.com/ \\
  -H "Content-Type: application/json" \\
  -d '{"text":"hello from curl"}'`}
          language="bash"
          variant="flat"
          className="w-full"
        />
      </div>
    </div>
  );
}
