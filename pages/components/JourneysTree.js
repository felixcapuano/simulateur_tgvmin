import { TreeView, TreeItem } from '@mui/lab';
import { useEffect, useState } from 'react';
// import { ExpandMoreIcon, ChevronRightIcon } from '@mui/icons-material';

const DateTreeItem = ({ journeys }) => {
  return <TreeItem></TreeItem>;
};

const JourneysTree = ({ journeys }) => {
  if (journeys === {}) return null;

  const renderTree = (nodes, label) => {
    if (typeof nodes !== 'object') return null;

    const id = nodes.id;

    const child = Object.keys(nodes).map((label) => {
      renderTree(nodes[label], label);
    });

    return (
      <TreeItem nodeId={id} label={label} key={id}>
        {child}
      </TreeItem>
    );
  };

  return (
    <TreeView
      aria-label='file system navigator'
      // defaultCollapseIcon={<ExpandMoreIcon />}
      // defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      {/* {renderTree(journeys, 'root')} */}
    </TreeView>
  );
};

export default JourneysTree;
