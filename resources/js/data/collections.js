const collections = [
  {
    value: 1,
    label: 'Files',
  },
  {
    value: 2,
    label: 'Reviews',
  },
  {
    value: 3,
    label: 'Email Capture',
  },
  {
    value: 4,
    label: 'Advertising',
  },
  {
    value: 5,
    label: 'Loyalty & Rewards',
  },
  {
    value: 6,
    label: 'Shipping & Logistics',
  },
  {
    value: 7,
    label: 'Customer support',
  },
];

const statusClient = [
  {
    key: 'pending',
    value: 'Pending',
    status: 'warning',
  },
  {
    key: 'approved',
    value: 'Approved',
    status: 'success',
  },
  {
    key: 'rejected',
    value: 'Rejected',
    status: 'critical',
  },
  {
    key: 'deactivated',
    value: 'Deactivated',
    status: 'default',
  },
];

const optionList = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Deactivated', value: 'deactivated' },
];
export { collections, statusClient, optionList };
