<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Use TanStack file routes for all shareable RoyaltiChain screens with per-route head metadata, so navigation and direct links remain consistent.
- Keep fictional prototype data and mutations in a shared in-memory React provider; no persistence or real wallet connection is implied.
- Use shared presentation components and global semantic CSS tokens for all screens, so future data integrations do not duplicate UI logic.
