// Inventories List Page with ServerDataTable (Easy-to-use wrapper)
import { Box, Heading, Flex, Link } from '@chakra-ui/react';
import {
  ServerDataTable,
  TableColumn,
  FetchDataParams,
  FetchDataResponse,
} from '@/components/tables';

// ============================================================================
// Types
// ============================================================================

interface BillingGroup {
  billingGroupId: number;
  billingGroupName: string;
  dateCreated: string;
  companyId: number;
  companyName: string;
  inventoryId: number;
}

// ============================================================================
// Mock Data - Replace with actual API integration
// ============================================================================

const generateMockData = (): BillingGroup[] => {
  const companies = [
    { id: 1047488256, name: 'qa_ppo_test_1733910713' },
    { id: 1047488255, name: 'qa_ppo_test_1764157980' },
    { id: 1047488253, name: 'Telna' },
    { id: 1047488251, name: 'Telna' },
    { id: 1047488250, name: 'Telna' },
    { id: 1, name: 'Telna' },
    { id: 1047488220, name: 'Divyanshu_L2' },
    { id: 1047485609, name: 'qa_ppo_test_1727675623' },
  ];

  const billingGroups: BillingGroup[] = [
    {
      billingGroupId: 1097715,
      billingGroupName: 'qa_ppo_test_1733910713',
      dateCreated: '2025-11-26 11:53:27',
      companyId: 1047488256,
      companyName: 'qa_ppo_test_1733910713',
      inventoryId: 54310,
    },
    {
      billingGroupId: 1097712,
      billingGroupName: 'qa_ppo_test_1764157980',
      dateCreated: '2025-11-26 11:53:02',
      companyId: 1047488255,
      companyName: 'qa_ppo_test_1764157980',
      inventoryId: 54309,
    },
    {
      billingGroupId: 1097713,
      billingGroupName: 'Telna',
      dateCreated: '2025-11-26 05:36:42',
      companyId: 1047488253,
      companyName: 'Telna',
      inventoryId: 54306,
    },
    {
      billingGroupId: 1097679,
      billingGroupName: 'Telna',
      dateCreated: '2025-11-24 07:18:30',
      companyId: 1047488251,
      companyName: 'Telna',
      inventoryId: 54304,
    },
    {
      billingGroupId: 1097676,
      billingGroupName: 'Telna',
      dateCreated: '2025-11-24 07:15:39',
      companyId: 1047488250,
      companyName: 'Telna',
      inventoryId: 54303,
    },
    {
      billingGroupId: 1097677,
      billingGroupName: 'Demo_rename',
      dateCreated: '2025-11-20 12:42:22',
      companyId: 1,
      companyName: 'Telna',
      inventoryId: 1,
    },
    {
      billingGroupId: 1097684,
      billingGroupName: 'BG_Divyanshu_L2',
      dateCreated: '2025-11-20 07:26:32',
      companyId: 1047488220,
      companyName: 'Divyanshu_L2',
      inventoryId: 54282,
    },
    {
      billingGroupId: 1097683,
      billingGroupName: 'Custom Test Group',
      dateCreated: '2025-11-11 13:27:40',
      companyId: 1,
      companyName: 'Telna',
      inventoryId: 1,
    },
    {
      billingGroupId: 1097517,
      billingGroupName: 'qa_ppo_test_1727675623',
      dateCreated: '2025-11-10 15:04:07',
      companyId: 1047485609,
      companyName: 'qa_ppo_test_1727675623',
      inventoryId: 53355,
    },
    {
      billingGroupId: 1097515,
      billingGroupName: 'AutoGrp_L1_Auth_1761818975_E...',
      dateCreated: '2025-10-30 10:09:36',
      companyId: 1,
      companyName: 'Telna',
      inventoryId: 1,
    },
  ];

  // Generate more data for pagination demo
  const allData: BillingGroup[] = [...billingGroups];
  for (let i = 0; i < 691; i++) {
    const company = companies[i % companies.length];
    allData.push({
      billingGroupId: 1097514 - i,
      billingGroupName: `BillingGroup_${(1097514 - i).toString()}`,
      dateCreated: `2025-10-${String(29 - (i % 28)).padStart(2, '0')} ${String(
        8 + (i % 12),
      ).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}`,
      companyId: company.id,
      companyName: company.name,
      inventoryId: 53354 - i,
    });
  }

  return allData;
};

const ALL_MOCK_DATA = generateMockData();
const TOTAL_ROWS = 701;

// ============================================================================
// API Function - Replace with actual API call
// ============================================================================

const fetchBillingGroups = async (
  params: FetchDataParams,
): Promise<FetchDataResponse<BillingGroup>> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const data = [...ALL_MOCK_DATA];

  // Apply sorting
  if (params.sortBy) {
    data.sort((a, b) => {
      const aVal = a[params.sortBy as keyof BillingGroup];
      const bVal = b[params.sortBy as keyof BillingGroup];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return params.sortOrder === 'desc' ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return params.sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
      }
      return 0;
    });
  }

  // Apply pagination
  const startIndex = params.page * params.pageSize;
  const paginatedData = data.slice(startIndex, startIndex + params.pageSize);

  return {
    data: paginatedData,
    totalRows: TOTAL_ROWS,
  };
};

// ============================================================================
// Column Definitions
// ============================================================================

const columns: TableColumn<BillingGroup>[] = [
  {
    key: 'billingGroupId',
    header: 'Billing Group ID',
    width: '140px',
    render: row => (
      <Link fontWeight='medium' _hover={{ textDecoration: 'underline' }}>
        {row.billingGroupId}
      </Link>
    ),
  },
  {
    key: 'billingGroupName',
    header: 'Billing Group Name',
    minWidth: '180px',
    render: row => (
      <Link _hover={{ textDecoration: 'underline' }}>
        {row.billingGroupName}
      </Link>
    ),
  },
  {
    key: 'dateCreated',
    header: 'Date Created (UTC)',
    tooltip: 'Date and time in UTC timezone',
    width: '180px',
    render: row => {
      const [date, time] = row.dateCreated.split(' ');
      return (
        <Flex gap={1}>
          <Box as='span'>{date}</Box>
          <Box as='span' color='gray.400'>
            {time}
          </Box>
        </Flex>
      );
    },
  },
  {
    key: 'companyId',
    header: 'Company ID',
    width: '130px',
    render: row => (
      <Link _hover={{ textDecoration: 'underline' }}>
        {row.companyId}
      </Link>
    ),
  },
  {
    key: 'companyName',
    header: 'Company Name',
    minWidth: '160px',
    render: row => (
      <Link _hover={{ textDecoration: 'underline' }}>
        {row.companyName}
      </Link>
    ),
  },
  {
    key: 'inventoryId',
    header: 'Inventory ID',
    width: '120px',
    render: row => (
      <Link _hover={{ textDecoration: 'underline' }}>
        {row.inventoryId}
      </Link>
    ),
  },
  {
    key: 'actions',
    header: 'Actions',
    sortable: false,
    width: '80px',
    align: 'center',
    render: () => null, // Placeholder for action buttons
  },
];

// ============================================================================
// Component
// ============================================================================

export default function InventoriesList() {
  // Row click handler
  const handleRowClick = (row: BillingGroup) => {
    console.info('Row clicked:', row);
    // Navigate to detail page or show modal
  };

  return (
    <Box p={6}>
      <Flex justify='space-between' align='center' mb={6}>
        <Heading size='lg'>Billing Groups</Heading>
      </Flex>

      {/* 
        ServerDataTable - Much simpler to use!
        Just provide columns and a fetch function.
        All state management is handled internally.
      */}
      <ServerDataTable
        columns={columns}
        fetchData={fetchBillingGroups}
        defaultPageSize={10}
        defaultSortBy='dateCreated'
        defaultSortOrder='desc'
        emptyMessage='No billing groups found.'
        onRowClick={handleRowClick}
        testIdPrefix='billing-groups-table'
      />
    </Box>
  );
}
