import { TreeView, TreeItem } from '@mui/lab';
// import { ExpandMoreIcon, ChevronRightIcon } from '@mui/icons-material';

const JourneysTreeItems = ({ label, data, nodeId = '0' }) => {
  if (typeof data !== 'object') return null;

  // const [keys, setKeys] = useState(Object.keys(data));
  const labels = Object.keys(data);
  const subTreeItem = labels.map((label, index) => {
    return (
      <JourneysTreeItems
        label={label}
        data={data[label]}
        nodeId={index.toString()}
        key={index}
      />
    );
  });

  return (
    <TreeItem nodeId={nodeId} label={label}>
      {subTreeItem}
    </TreeItem>
  );
};

const JourneysTree = ({ journeys = {} }) => {
  return (
    <TreeView
      aria-label='file system navigator'
      // defaultCollapseIcon={<ExpandMoreIcon />}
      // defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <JourneysTreeItems data={journeys} label='toto' nodeId='0' />
    </TreeView>
  );
};

export default JourneysTree;
