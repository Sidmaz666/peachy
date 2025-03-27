import { Peachy } from "@peach/component";
import { waitFor } from "@peach/utils";

export default function Peach3dModel() {
  // Animation variables.
  let frameId;
  let rotation = 0; // Current rotation angle.
  let canvas; // Reference to the canvas element.
  const startTime = Date.now();

  // Oscillation configuration:
  // The peach rotates between -45° and 45° (i.e. ±Math.PI/4)
  const amplitude = Math.PI / 4;
  const speed = 0.5; // Reduced speed multiplier (radians per second)

  // Code snippet animation variables.
  // Only using Peachy Application component snippets.
  const snippetPool = [
    "import { useState } from '@peach/component';",
    "import { useGlobalState } from '@peach/component';",
    "import { AppState } from '@peach/state';",
    "import { PersistedAppState } from '@peach/state';",
    "import { peachyRouter } from '@peach/router';",
    "export default function Peachy() {",
    "const [state, setState] = useState(false);",
    "return <div>Hello, Peachy!</div>;",
    "AppState.subscribe((newState) => {",
    "console.log('Global state changed:', newState);",
    "PersistedAppState.set('theme', 'dark');",
    "import { Link } from '@peach/router';"
  ];
  let snippets = []; // Active snippets on screen.
  let lastSnippetTime = 0;
  const snippetInterval = 2000; // Spawn a new snippet every 2 seconds

  // Draw the peach centered on the canvas with horizontal rotation.
  const drawPeach = (ctx, rotation) => {
    // Clear the canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save context and center the coordinate system.
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotation);

    // Create a radial gradient for the peach body.
    const gradient = ctx.createRadialGradient(0, 0, 10, 0, 0, 80);
    gradient.addColorStop(0, "#FFD9CC");
    gradient.addColorStop(1, "#FF6B3D");

    // Draw the peach body.
    ctx.beginPath();
    ctx.arc(0, 0, 80, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw a shadow/highlight for a 3D effect.
    ctx.beginPath();
    ctx.arc(-30, -30, 50, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.fill();

    // Draw the stem.
    ctx.beginPath();
    ctx.moveTo(0, -80);
    ctx.quadraticCurveTo(15, -100, 30, -90);
    ctx.strokeStyle = "#864A2E";
    ctx.lineWidth = 5;
    ctx.stroke();

    // Draw the leaf.
    ctx.beginPath();
    ctx.moveTo(30, -90);
    ctx.quadraticCurveTo(50, -100, 60, -85);
    ctx.quadraticCurveTo(50, -80, 30, -90);
    ctx.fillStyle = "#4CAF50";
    ctx.fill();

    ctx.restore();
  };

  // Spawn a new snippet at the bottom center.
  const spawnSnippet = (currentTime) => {
    const text = snippetPool[Math.floor(Math.random() * snippetPool.length)];
    snippets.push({
      text,
      x: canvas.width / 2,
      y: canvas.height - 50,
      createdTime: currentTime,
      lifetime: 3000 // 3 seconds lifetime
    });
  };

  // Draw snippets on the canvas.
  const drawSnippets = (ctx, elapsed) => {
    // Filter out expired snippets.
    snippets = snippets.filter(snippet => {
      const age = elapsed * 1000 - snippet.createdTime;
      const progress = age / snippet.lifetime;
      if (progress >= 1) return false;

      // Fade-out effect but maintain a minimum opacity for readability.
      const alpha = 1 - progress * 0.5; // never falls below 0.5
      const yOffset = -progress * 50; // Move upward by 50 pixels over lifetime

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.font = "16px monospace";
      // Use Peachy theme color for the snippets.
      ctx.fillStyle = "#FF6B3D";
      ctx.textAlign = "center";
      ctx.fillText(snippet.text, snippet.x, snippet.y + yOffset);
      ctx.restore();
      return true;
    });
  };

  // Animation loop: update the rotation using a sine oscillation and animate snippets.
  const animate = () => {
    const ctx = canvas.getContext("2d");
    const elapsed = (Date.now() - startTime) / 1000;

    // Update rotation with reduced speed.
    rotation = amplitude * Math.sin(elapsed * speed);

    // Possibly spawn a new snippet if the interval has passed.
    if (elapsed * 1000 - lastSnippetTime > snippetInterval) {
      spawnSnippet(elapsed * 1000);
      lastSnippetTime = elapsed * 1000;
    }

    // Draw peach and code snippets.
    drawPeach(ctx, rotation);
    drawSnippets(ctx, elapsed);

    frameId = requestAnimationFrame(animate);
  };

  // Handle canvas resize.
  const handleResize = () => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const ctx = canvas.getContext("2d");
    // Redraw immediately to update dimensions.
    drawPeach(ctx, rotation);
    drawSnippets(ctx, (Date.now() - startTime) / 1000);
  };

  // Lifecycle: runs immediately after the component is mounted.
  const mount = async () => {
    try {
      canvas = await waitFor("canvas");
    } catch (err) {
      console.error(err);
      return;
    }
    // Set initial dimensions and start animation.
    handleResize();
    window.addEventListener("resize", handleResize);
    animate();
  };

  // Lifecycle: runs when the component is unmounted.
  const unmount = () => {
    cancelAnimationFrame(frameId);
    window.removeEventListener("resize", handleResize);
  };

  // Create the canvas element via Peachy's JSX.
  const canvasEl = <canvas className="w-full min-h-[500px]" />;
  // Attach lifecycle functions.
  canvasEl.__lifecycle = { mount, unmount };

  // IMPORTANT: the default return must be the JSX element only.
  return canvasEl;
}
