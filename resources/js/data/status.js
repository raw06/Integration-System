const status = [
  {
    value: 'pending',
    label: 'Pending',
    tone: 'warning',
  },
  {
    value: 'deactivated',
    label: 'Deactivated',
    tone: '',
  },
  {
    value: 'actived',
    label: 'Actived',
    tone: 'success',
  },
  {
    value: 'approved',
    label: 'Approved',
    tone: 'success',
  },
  {
    value: 'rejected',
    label: 'Rejected',
    tone: 'critical',
  },
];

const ACTIVED = 'actived';
const DEACTIVATED = 'deactivated';
const APPROVED = 'approved';
const PENDING = 'pending';
const REJECTED = 'rejected';

export { status, ACTIVED, DEACTIVATED, APPROVED, PENDING, REJECTED };
