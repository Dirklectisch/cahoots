# Cahoots specifications (draft)

## API

### Static

    /workspaces
    -> list
    /workspaces/[workspace]
    -> list
    /workspaces/[workspace]/files/[path]

### Dynamic

    /workspaces
    -> add ( workspace )
    -> remove ( workspace )

    /workspaces/[workspace]
    -> new ( path, hash )
    -> delete ( path )
    -> updated ( path, hash )

    /workspaces/[workspace]/chat
    -> say ( text )

    /workspaces/[workspace]/files/[path]

## Scenarios

### Alice wants to track Bobs workspace in her browser

1. Bob starts cahoots at current workspace, calling it 'bob'.
2. Bob sends URL, http://cahoots/workspaces/bob, to Alice.
3. Alice points her browser at /workspaces/bob and requests the page.
4. Cahoots sees 'Accept' header set to text/html, and sends cahoots web-client.
5. Alice's web-client does a static 'list' on the current workspace.
6. Alice's web-client subscribes to workspace and file channels.
7. Bob's cahoots keeps pushing updates on file and workspace channels keeping Alice up-to-date.