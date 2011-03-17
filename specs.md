/workspaces

/workspaces

/projects

/projects/[project]
/projects/[project]/chat
/projects/[project]
-> newfile
-> deletefile
-> filechanged { file: [filename] }
/projects/[project]/files/[filename]

describe workspace

it should publish its creation
it should publish its removal
it should be able to list protocols
it should be able to list the files
it should publish new files
it should publish removed files
it should publish active file
it should be able to track another workspace

describe file
it should publish changes

describe protocol
it should announce its existence

describe protocol_file
it should be able to send a full file

describe protocol_line
it should be able to send a line

describe protocol_range
it should be able to send a range of characters
