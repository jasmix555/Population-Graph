import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { usePopulationInfo } from '../../api/hooks/usePopulationInfo';
import { PopulationChartProps } from '../../types/resas-api';
import style from './style.module.css';

type CustomChart = Highcharts.Chart & {
  showLoading(message?: string): void;
  hideLoading(): void;
};

export const PopulationChart: React.FC<PopulationChartProps> = ({
  selectedPrefectures,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('総人口');

  const { populationData, isLoading, isError } =
    usePopulationInfo(selectedPrefectures);

  const categories = [
    '総人口',
    '年少人口',
    '生産年齢人口',
    '老年人口',
  ] as const;

  const allYears =
    populationData[selectedPrefectures[0]?.prefCode]
      ?.find((pop) => pop.label === selectedCategory)
      ?.data.map((d) => d.year) || [];

  const filteredYears = allYears.filter(
    (year) => year !== null && year <= 2024,
  );

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedCategory(event.target.value);
  };

  const series = selectedPrefectures
    .map((prefecture) => {
      const data = populationData[prefecture.prefCode]?.find(
        (pop) => pop.label === selectedCategory,
      );
      if (!data) return { name: prefecture.prefName, data: [] };

      const actualData = data.data
        .filter((d) => d.year <= 2024)
        .map((d) => d.value);

      return [
        {
          name: `${prefecture.prefName}`,
          data: actualData,
        },
      ];
    })
    .flat();

  const isAnyCheckboxSelected = selectedPrefectures.length > 0;

  const formatNumber = (value: number): string => {
    if (value >= 100000000) {
      return `${(value / 100000000).toFixed(1)}億`;
    } else if (value >= 10000) {
      return `${(value / 10000).toFixed(1)}万`;
    } else {
      return value.toString();
    }
  };

  const options = {
    chart: {
      type: 'line',
      style: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '1.6rem',
        height: 'fit-content',
      },
      events: {
        noData: function (this: CustomChart) {
          if (!isAnyCheckboxSelected) {
            this.showLoading('都道府県を選択してください。');
          }
          return { text: '都道府県を選択してください。' };
        },
        load: function (this: CustomChart) {
          if (isLoading) {
            this.showLoading('読み込み中。。。');
          } else {
            this.hideLoading();
          }
        },
        redraw: function (this: CustomChart) {
          if (isLoading) {
            this.showLoading('読み込み中。。。');
          } else {
            this.hideLoading();
          }
        },
        error: function (this: CustomChart) {
          if (isError) {
            this.showLoading('読み込みエラー');
          }
        },
      },
    },
    legend: {
      align: 'right',
      verticalAlign: 'top',
    },
    lang: {
      noData: '都道府県を選択してください',
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            chart: {
              style: {
                height: '400',
                fontSize: '1rem',
              },
            },
          },
        },
      ],
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: [...filteredYears],
      title: {
        text: '年齢',
      },
    },
    yAxis: {
      title: {
        text: '人口数',
      },
      labels: {
        formatter: function (this: { value: number }): string {
          return formatNumber(this.value);
        },
      },
    },
    series,
  };

  return (
    <div className={style.container}>
      <select
        onChange={handleCategoryChange}
        value={selectedCategory}
        className={style.select}
      >
        {categories.map((category) => (
          <option
            key={category}
            value={category}
          >
            {category}
          </option>
        ))}
      </select>

      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
};
