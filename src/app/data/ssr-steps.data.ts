import { Step } from '../models/demo.model';

export const SSR_STEPS: Step[] = [
  {
    title: "1. User Requests Page",
    description: "Browser sends request to server",
    server: "Waiting for request...",
    browser: "Loading...",
    userSees: "🔄 Loading spinner",
    highlight: "request"
  },
  {
    title: "2. Server Renders Angular App",
    description: "Server executes Angular components and generates HTML",
    server: "Running Angular...\nGenerating HTML...",
    browser: "Waiting...",
    userSees: "🔄 Still loading...",
    highlight: "server"
  },
  {
    title: "3. Server Sends HTML + State",
    description: "Complete HTML with embedded serialized state",
    server: "Sending:\n<html>...\n<script>state</script>",
    browser: "Receiving HTML...",
    userSees: "🔄 Loading...",
    highlight: "transfer"
  },
  {
    title: "4. Browser Displays HTML",
    description: "User sees content immediately (but not interactive yet)",
    server: "Complete ✓",
    browser: "✓ Displaying HTML\n⚠ Not interactive yet",
    userSees: "✅ Full page content visible!\n⚠️ Buttons don't work yet",
    highlight: "browser"
  },
  {
    title: "5. JavaScript Downloads",
    description: "Angular bundles load in background",
    server: "Complete ✓",
    browser: "Downloading JS...\nStill showing static HTML",
    userSees: "✅ Reading content\n⚠️ Can't click anything yet",
    highlight: "browser"
  },
  {
    title: "6. Hydration Begins",
    description: "Angular reads serialized state and matches DOM",
    server: "Complete ✓",
    browser: "Reading state...\nMatching DOM nodes...",
    userSees: "✅ Page looks ready\n🔄 Making interactive...",
    highlight: "hydration"
  },
  {
    title: "7. App Interactive!",
    description: "Event listeners attached, app fully functional",
    server: "Complete ✓",
    browser: "✓ Fully interactive!\n✓ Event listeners active",
    userSees: "✅ Everything works!\n✅ Buttons clickable!",
    highlight: "complete"
  }
];