# Release Variant Primary Focus Plan

Configure the Android Directory Tree Visualizer to prioritize the `release` build variant as the default active state while maintaining both stacked artifact paths in the light grey text box.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following product choices were confirmed during interactive clarification:
> - **Primary Default Variant**: Set `release` (`app-release.apk`) as the default active variant on initial application load.
> - **Artifact Path Display**: Keep both `debug` and `release` paths stacked within the light grey text box, with the active `release` path elevated as primary.

---

## 1. Overview & Core Concept

- **What It Delivers**: An immediate, prominent focus on the production-ready release artifact (`app/build/outputs/apk/release/app-release.apk`), including release keystore metadata, R8-optimized size (2.18 MB), and `:app:assembleRelease` Gradle task alignment.
- **Target Audience**: Android developers, DevOps engineers, and learners inspecting Android Gradle Plugin (AGP) build artifact hierarchies.
- **Key Value**: Direct access to production release packaging specifications without needing to manually toggle away from debug defaults, while preserving stacked visibility of both build paths.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Initial Page Load**:
   - The hierarchy subtitle and header reflect `release` variant immediately.
   - The tree highlights `release` folder and `app-release.apk` with amber accents and active glow.
   - The light grey box displays both stacked paths, with the release row highlighted with active focus ring and primary copy action.
2. **Interactive Switching**:
   - Clicking either APK card (`app-debug.apk` or `app-release.apk`) or path row seamlessly switches active variant state across all visualizers.
   - Inspecting an artifact loads release-specific cryptographic signatures (`v1/v2/v3`), R8 minification stats, and ADB install commands.

### Visual Styling & Theme Tokens
- **Release Accent**: Warm amber (`#F59E0B`, `amber-400`, `amber-950/40`) denoting signed production release.
- **Debug Accent**: Violet/purple (`#A855F7`, `purple-400`, `purple-950/40`) denoting development builds.
- **Light Grey Container**: Crisp `#e5e7eb` surface with dark slate monospace typography for contrast and legibility.

---

## 3. Key Product Decisions & Trade-Offs

- **Default State Shift**:
  - *Decision*: Change default `variant` state from `'debug'` to `'release'` in `App.tsx`.
  - *Why*: Direct alignment with user requirement to focus on `app-release.apk`.
- **Stacked Dual-Path Retention**:
  - *Decision*: Retain stacked rows for both `debug` and `release` rather than deleting debug.
  - *Why*: Directly confirms user's preference in clarifying questions, enabling quick side-by-side comparison and instant copy actions.
- **Gradle & Terminal Alignment**:
  - *Decision*: Default `GradleSimulatorModal` to `:app:assembleRelease` task and `release.jks` signing step.
  - *Why*: Ensures terminal simulator reflects the primary variant choice without manual toggling.

---

## 4. Technical Architecture & System Flow

```
┌────────────────────────────────────────────────────────┐
│                        App.tsx                         │
│             variant: 'release' (Default)                │
└───────────────┬────────────────────────┬───────────────┘
                │                        │
       ┌────────▼────────┐      ┌────────▼────────┐
       │  DirectoryTree  │      │   PathTextBox   │
       │  (release active│      │ (Stacked Paths) │
       │   highlighted)  │      │ Release on Top  │
       └────────┬────────┘      └────────┬────────┘
                │                        │
       ┌────────▼────────────────────────▼────────┐
       │           ApkInspectorModal              │
       │  (Inspects app-release.apk by default)   │
       └──────────────────────────────────────────┘
```

### Component State & Handler Mapping
- `App.tsx`:
  - `const [variant, setVariant] = useState<BuildVariant>('release')`: Default variant set to `release`.
  - Context badge updated to highlight `release` on mount.
- `PathTextBox.tsx`:
  - Release row placed at top of the stack as primary target, followed by debug row.
  - Dedicated copy button and keyboard-accessible code blocks for `app / build / outputs / apk / release / app-release.apk`.
- `DirectoryTree.tsx`:
  - Both `debug` and `release` folders remain visible and expandable, with `release` receiving initial active focus.
