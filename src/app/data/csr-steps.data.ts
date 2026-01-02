import { Step } from '../models/demo.model';

export const CSR_STEPS: Step[] = [
  {
    title: "1. User Requests Page",
    description: "Browser sends request to server",
    server: "Waiting for request...",
    browser: "Loading...",
    userSees: "🔄 Loading spinner",
    highlight: "request"
  },
  {
    title: "2. Server Sends Empty HTML",
    description: "Server sends minimal HTML with just script tags",
    server: "Sending:\n<html>\n  <app-root></app-root>\n  <script src='main.js'>",
    browser: "Receiving HTML...",
    userSees: "🔄 Still loading...",
    highlight: "transfer"
  },
  {
    title: "3. Browser Shows Empty Shell",
    description: "Browser displays empty page or loading spinner",
    server: "Complete ✓",
    browser: "✓ HTML received\n⚠ Page is empty\n⚠ Waiting for JS...",
    userSees: "⚪ Blank page OR\n🔄 Loading spinner",
    highlight: "browser"
  },
  {
    title: "4. JavaScript Downloads",
    description: "Angular bundles start downloading (can be large)",
    server: "Complete ✓",
    browser: "Downloading JS...\n📦 main.js (2MB)\n📦 polyfills.js",
    userSees: "⚪ Still blank page\n🔄 Still loading...",
    highlight: "browser"
  },
  {
    title: "5. JavaScript Executes",
    description: "Browser parses and runs Angular code",
    server: "Complete ✓",
    browser: "Parsing JS...\nExecuting Angular...\nBootstrapping app...",
    userSees: "⚪ Still blank\n🔄 Loading...",
    highlight: "browser"
  },
  {
    title: "6. Angular Renders Components",
    description: "Angular creates DOM elements and renders UI",
    server: "Complete ✓",
    browser: "Creating components...\nBuilding DOM tree...\nRendering HTML...",
    userSees: "✨ Content starts appearing!\n🔄 Rendering...",
    highlight: "rendering"
  },
  {
    title: "7. App Interactive!",
    description: "Page fully rendered and interactive",
    server: "Complete ✓",
    browser: "✓ DOM created\n✓ Event listeners attached\n✓ Fully interactive!",
    userSees: "✅ Everything visible!\n✅ Buttons clickable!",
    highlight: "complete"
  }
];