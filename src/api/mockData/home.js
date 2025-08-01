export default {
  getTableData: () => {
    return {
      code: 200,
      data: {
        tableData: [
          {
            name: "java",
            todayBuy: 100,
            monthBuy: 200,
            totalBuy: 300,
          },
          {
            name: "python",
            todayBuy: 100,
            monthBuy: 200,
            totalBuy: 300,
          },
          {
            name: "c++",
            todayBuy: 100,
            monthBuy: 200,
            totalBuy: 300,
          },
          {
            name: "c",
            todayBuy: 100,
            monthBuy: 200,
            totalBuy: 300,
          },
          {
            name: "go",
            todayBuy: 100,
            monthBuy: 200,
            totalBuy: 300,
          },
          {
            name: "ts",
            todayBuy: 100,
            monthBuy: 200,
            totalBuy: 300,
          },
        ],
      },
    };
  },
  getCountData: () => {
    return {
      code: 200,
      data: [
        {
          name: "今日收藏订单",
          value: 201,
          icon: "starFilled",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1243,
          icon: "GoodsFilled",
          color: "#5ab1ef",
        },
        {
          name: "今日支付订单",
          value: 2345,
          icon: "SuccessFilled",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 1201,
          icon: "starFilled",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 12453,
          icon: "GoodsFilled",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 23345,
          icon: "SuccessFilled",
          color: "#2ec7c9",
        },
      ],
    };
  },
  getChartData: () => {
    return {
      code: 200,
      data: {
        orderData: {
          date: [
            "2019-10-01",
            "2019-10-02",
            "2019-10-03",
            "2019-10-04",
            "2019-10-05",
            "2019-10-06",
            "2019-10-07",
          ],
          data: [
            {
              java: 3425,
              python: 6323,
              "c++": 1326,
              go: 6147,
              c: 7845,
              ts: 1264,
            },
            {
              java: 4564,
              python: 6458,
              "c++": 5343,
              go: 7545,
              c: 3452,
              ts: 6523,
            },
            {
              java: 4543,
              python: 7653,
              "c++": 5485,
              go: 7458,
              c: 543,
              ts: 2473,
            },
            {
              java: 3125,
              python: 6332,
              "c++": 3226,
              go: 6137,
              c: 7845,
              ts: 1234,
            },
            {
              java: 3490,
              python: 323,
              "c++": 1326,
              go: 6147,
              c: 7875,
              ts: 1634,
            },
            {
              java: 3426,
              python: 6321,
              "c++": 2136,
              go: 6147,
              c: 7834,
              ts: 1226,
            },
            {
              java: 342,
              python: 623,
              "c++": 136,
              go: 617,
              c: 7835,
              ts: 1263,
            },
          ],
        },
        videoData: [
          { name: "java", value: 123523 },
          { name: "python", value: 2165 },
          { name: "go", value: 6734 },
          { name: "c", value: 7828 },
          { name: "ts", value: 54383 },
          { name: "c++", value: 14574 },
        ],
        userData: [
          { date: "周一", new: 5, active: 200 },
          { date: "周二", new: 10, active: 500 },
          { date: "周三", new: 12, active: 550 },
          { date: "周四", new: 60, active: 800 },
          { date: "周五", new: 65, active: 550 },
          { date: "周六", new: 53, active: 770 },
          { date: "周日", new: 33, active: 170 },
        ],
      },
    };
  },
};
