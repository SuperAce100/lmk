import Image from "next/image";
import { CodeBlock } from "@/components/ui/code-block";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-neutral-200 px-4 py-12">
      <div className="flex max-w-sm flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="" width={64} height={64} priority />
          <h1 className="text-2xl font-medium text-neutral-800">lmk</h1>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <p className="text-neutral-600">
            Send me a text by POSTing JSON with{" "}
            <code className="rounded bg-neutral-300 px-1.5 py-0.5 font-mono text-sm">text</code> in
            the body.
          </p>
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
