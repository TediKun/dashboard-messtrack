import { User, Schedule, TaskLog, Fine, FinanceTransaction, Arrear } from '@/types/database';

export const fallbackUsers: User[] = [
  {
    "id": "00000000-0000-0000-0000-000000000001",
    "name": "Cecep Supriatna",
    "phone_number": "628120000001",
    "role": "user"
  },
  {
    "id": "00000000-0000-0000-0000-000000000002",
    "name": "Dadan",
    "phone_number": "628120000002",
    "role": "user"
  },
  {
    "id": "00000000-0000-0000-0000-000000000003",
    "name": "Sofwan",
    "phone_number": "628120000003",
    "role": "user"
  },
  {
    "id": "00000000-0000-0000-0000-000000000004",
    "name": "Tedi Triadi",
    "phone_number": "628120000004",
    "role": "admin"
  },
  {
    "id": "00000000-0000-0000-0000-000000000005",
    "name": "Rama Cahya Maulana",
    "phone_number": "628120000005",
    "role": "user"
  }
];

export const fallbackSchedules: Schedule[] = [
  {
    "id": "sched-7",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-05-03",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-8",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-05-04",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-9",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-05-05",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-10",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-05-06",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-11",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-05-07",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-12",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-05-08",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-13",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-05-09",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-21",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-05-10",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-22",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-05-11",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-23",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-05-12",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-24",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-05-13",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-25",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-05-14",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-26",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-05-15",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-27",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-05-16",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-35",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-05-17",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-36",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-05-18",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-37",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-05-19",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-38",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-05-20",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-39",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-05-21",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-40",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-05-22",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-41",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-05-23",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-49",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-05-24",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-50",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-05-25",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-51",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-05-26",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-52",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-05-27",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-53",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-05-28",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-54",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-05-29",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-55",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-05-30",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-59",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-05-31",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-1",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-06-01",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-2",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-06-02",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-3",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-06-03",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-4",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-06-04",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-5",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-06-05",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-6",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-06-06",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-14",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-06-07",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-15",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-06-08",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-16",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-06-09",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-17",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-06-10",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-18",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-06-11",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-19",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-06-12",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-20",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-06-13",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-28",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-06-14",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-29",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-06-15",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-30",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-06-16",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-31",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-06-17",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-32",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-06-18",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-33",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-06-19",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-34",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-06-20",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-42",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-06-21",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-43",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-06-22",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-44",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-06-23",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-45",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-06-24",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-46",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-06-25",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-47",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-06-26",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-48",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-06-27",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-56",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-06-28",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-57",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-06-29",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-58",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-06-30",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-60",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-07-01",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-61",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-07-02",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-62",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-07-03",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-63",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-07-04",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-70",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-07-05",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-71",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-07-06",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-72",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-07-07",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-73",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-07-08",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-74",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-07-09",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-75",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-07-10",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-76",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-07-11",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-91",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-07-12",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-92",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-07-13",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-93",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-07-14",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-94",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-07-15",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-95",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-07-16",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-96",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-07-17",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-97",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-07-18",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-112",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-07-19",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-113",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-07-20",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-114",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-07-21",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-115",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-07-22",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-116",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-07-23",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-117",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-07-24",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-118",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-07-25",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-133",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-07-26",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-134",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-07-27",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-135",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-07-28",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-136",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-07-29",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-137",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-07-30",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-138",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-07-31",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-64",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-08-01",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-77",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-08-02",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-78",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-08-03",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-79",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-08-04",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-80",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-08-05",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-81",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-08-06",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-82",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-08-07",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-83",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-08-08",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-98",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-08-09",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-99",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-08-10",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-100",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-08-11",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-101",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-08-12",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-102",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-08-13",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-103",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-08-14",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-104",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-08-15",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-119",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-08-16",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-120",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-08-17",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-121",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-08-18",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-122",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-08-19",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-123",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-08-20",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-124",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-08-21",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-125",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-08-22",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-139",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-08-23",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-140",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-08-24",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-141",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-08-25",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-142",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-08-26",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-143",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-08-27",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-144",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-08-28",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-145",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-08-29",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-150",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-08-30",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-151",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-08-31",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-65",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-09-01",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-66",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-09-02",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-67",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-09-03",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-68",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-09-04",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-69",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-09-05",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-84",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-09-06",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-85",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-09-07",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-86",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-09-08",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-87",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-09-09",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-88",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-09-10",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-89",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-09-11",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-90",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-09-12",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-105",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-09-13",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-106",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-09-14",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-107",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-09-15",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-108",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-09-16",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-109",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-09-17",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-110",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-09-18",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-111",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-09-19",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-126",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-09-20",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-127",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-09-21",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-128",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-09-22",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-129",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-09-23",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-130",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-09-24",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-131",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-09-25",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-132",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-09-26",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-146",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-09-27",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-147",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-09-28",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-148",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-09-29",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-149",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-09-30",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-152",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-10-01",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-153",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-10-02",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-154",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-10-03",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-167",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-10-04",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-168",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-10-05",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-169",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-10-06",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-170",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-10-07",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-171",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-10-08",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-172",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-10-09",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-173",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-10-10",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-188",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-10-11",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-189",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-10-12",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-190",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-10-13",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-191",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-10-14",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-192",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-10-15",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-193",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-10-16",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-194",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-10-17",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-209",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-10-18",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-210",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-10-19",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-211",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-10-20",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-212",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-10-21",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-213",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-10-22",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-214",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-10-23",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-215",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-10-24",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-230",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-10-25",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-231",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-10-26",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-232",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-10-27",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-233",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-10-28",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-234",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-10-29",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-235",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-10-30",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-236",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-10-31",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-155",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-11-01",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-156",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-11-02",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-157",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-11-03",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-158",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-11-04",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-159",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-11-05",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-160",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-11-06",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-161",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-11-07",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-174",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-11-08",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-175",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-11-09",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-176",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-11-10",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-177",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-11-11",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-178",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-11-12",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-179",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-11-13",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-180",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-11-14",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-195",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-11-15",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-196",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-11-16",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-197",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-11-17",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-198",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-11-18",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-199",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-11-19",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-200",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-11-20",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-201",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-11-21",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-216",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-11-22",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-217",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-11-23",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-218",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-11-24",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-219",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-11-25",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-220",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-11-26",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-221",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-11-27",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-222",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-11-28",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-237",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-11-29",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-238",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-11-30",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-162",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-12-01",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-163",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-12-02",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-164",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-12-03",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-165",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-12-04",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-166",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "date": "2026-12-05",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-181",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-12-06",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-182",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-12-07",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-183",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-12-08",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-184",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-12-09",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-185",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-12-10",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-186",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-12-11",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-187",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "date": "2026-12-12",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-202",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-12-13",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-203",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-12-14",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-204",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-12-15",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-205",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-12-16",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-206",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-12-17",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-207",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-12-18",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-208",
    "user_id": "00000000-0000-0000-0000-000000000002",
    "date": "2026-12-19",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-223",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-12-20",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-224",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-12-21",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-225",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-12-22",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-226",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-12-23",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-227",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-12-24",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-228",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-12-25",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-229",
    "user_id": "00000000-0000-0000-0000-000000000003",
    "date": "2026-12-26",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-239",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-12-27",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-240",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-12-28",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-241",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-12-29",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-242",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-12-30",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  },
  {
    "id": "sched-243",
    "user_id": "00000000-0000-0000-0000-000000000004",
    "date": "2026-12-31",
    "task_type": [
      "sapu",
      "pel",
      "sampah",
      "wc"
    ],
    "status": "pending"
  }
];

export const fallbackTaskLogs: TaskLog[] = [
  {
    "id": "log-1",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "task_date": "2026-05-03",
    "task_type": "sampah",
    "proof_url": null,
    "verified_at": "2026-05-03T07:15:00Z"
  },
  {
    "id": "log-2",
    "user_id": "00000000-0000-0000-0000-000000000005",
    "task_date": "2026-05-03",
    "task_type": "sapu",
    "proof_url": null,
    "verified_at": "2026-05-03T08:30:00Z"
  }
];

export const fallbackFines: Fine[] = [
  {
    "id": "fine-1",
    "user_id": "00000000-0000-0000-0000-000000000001",
    "month": 5,
    "year": 2026,
    "amount": 2500,
    "reason": "Tidak mengepel 1x (Minggu ke-2 Mei)",
    "is_paid": false
  }
];

export const fallbackFinanceTransactions: FinanceTransaction[] = [
  {
    id: "tx-1",
    user_id: null,
    type: "income",
    amount: 500000,
    description: "Saldo Kas Awal Mess",
    created_at: "2026-11-01T00:00:00Z"
  },
  {
    id: "tx-2",
    user_id: "00000000-0000-0000-0000-000000000004", // Tedi Triadi
    type: "income",
    amount: 65000,
    description: "Bayar Kas & WiFi Nov 2026 (Tedi Triadi)",
    created_at: "2026-11-02T10:15:00Z"
  },
  {
    id: "tx-3",
    user_id: null,
    type: "expense",
    amount: 40000,
    description: "Beli 2 Galon Aqua + Refill Gas Elpiji",
    created_at: "2026-11-05T09:30:00Z"
  },
  {
    id: "tx-4",
    user_id: null,
    type: "expense",
    amount: 25000,
    description: "Beli Wipol, Sabun Cuci Piring, & Spon",
    created_at: "2026-11-10T14:15:00Z"
  }
];

export const fallbackArrears: Arrear[] = [
  {
    id: "arr-1",
    user_id: "00000000-0000-0000-0000-000000000001", // Cecep
    type: "kas_wifi",
    amount_due: 65000,
    month: 11,
    year: 2026,
    is_paid: false,
    created_at: "2026-11-10T08:00:00Z"
  },
  {
    id: "arr-2",
    user_id: "00000000-0000-0000-0000-000000000002", // Dadan
    type: "kas_wifi",
    amount_due: 65000,
    month: 11,
    year: 2026,
    is_paid: false,
    created_at: "2026-11-10T08:00:00Z"
  },
  {
    id: "arr-3",
    user_id: "00000000-0000-0000-0000-000000000003", // Sofwan
    type: "kas_wifi",
    amount_due: 65000,
    month: 11,
    year: 2026,
    is_paid: false,
    created_at: "2026-11-10T08:00:00Z"
  },
  {
    id: "arr-4",
    user_id: "00000000-0000-0000-0000-000000000004", // Tedi
    type: "kas_wifi",
    amount_due: 65000,
    month: 11,
    year: 2026,
    is_paid: true,
    created_at: "2026-11-10T08:00:00Z"
  },
  {
    id: "arr-5",
    user_id: "00000000-0000-0000-0000-000000000005", // Rama
    type: "kas_wifi",
    amount_due: 65000,
    month: 11,
    year: 2026,
    is_paid: false,
    created_at: "2026-11-10T08:00:00Z"
  }
];

