import { useState, useEffect, useMemo } from 'react';
import { Tiny } from '@ant-design/charts';
import {
  salesData,
  categoryData,
  rankingData,
  salesRankData,
  storeData,
  miniAreaData,
  miniColumnData,
  statCardsData,
  salesRankColumns,
  storeColumns,
} from '../data';

export const useDashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const salesConfig = useMemo(() => ({
    data: salesData,
    xField: 'date',
    yField: 'value',
    smooth: true,
    color: '#1890ff',
    point: { size: 0 },
    lineStyle: { lineWidth: 2 },
    area: { style: { fill: 'l(270) 0:#ffffff 1:#1890ff', fillOpacity: 0.15 } },
    xAxis: { tickCount: 7, label: { style: { fill: '#8c8c8c', fontSize: 11 } } },
    yAxis: { label: { style: { fill: '#8c8c8c', fontSize: 11 } } },
    loading,
  }), [loading]);

  const pieConfig = useMemo(() => ({
    data: categoryData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.85,
    innerRadius: 0.5,
    label: { text: 'value', style: { fontWeight: 'bold', fontSize: 11 } },
    legend: { color: { title: false, marker: { symbol: 'circle' }, itemWidth: 80 } },
    statistic: { title: { content: '销售额', style: { fontSize: 12, color: '#8c8c8c' } }, content: { content: '¥126,560', style: { fontSize: 18, fontWeight: 'bold' } } },
    loading,
  }), [loading]);

  const salesPieConfig = useMemo(() => ({
    data: categoryData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    innerRadius: 0,
    label: { 
      text: 'type',
      style: { fontWeight: 'bold', fontSize: 11 } 
    },
    legend: { color: { title: false, marker: { symbol: 'circle' }, itemWidth: 80 } },
    loading,
  }), [loading]);

  const barConfig = useMemo(() => ({
    data: rankingData,
    xField: 'keyword',
    yField: 'count',
    colorField: 'keyword',
    height: 300,
    scale: {
      color: {
        range: ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1', '#13c2c2', '#eb2f96'],
      },
    },
    legend: false,
    style: {
      minWidth: 20,
      maxWidth: 40,
      radiusTopLeft: 4,
      radiusTopRight: 4,
    },
    axis: {
      x: { title: false, labelAutoRotate: false },
      y: { title: false },
    },
    loading,
  }), [loading]);

  const liquidConfig = useMemo(() => ({
    percent: 0.72,
    color: '#1890ff',
    outline: { distance: 4, style: { stroke: '#1890ff', strokeOpacity: 0.3 } },
    wave: { length: 128 },
    loading,
  }), [loading]);

  const miniAreaConfig = useMemo(() => ({
    data: miniAreaData,
    height: 50,
    padding: 0,shapeField: 'smooth',
    xField: 'index',
    yField: 'value',
    style: {
      fill: '#1890ff',
      // fill: 'linear-gradient(-90deg, white 0%, darkgreen 100%)',
      fillOpacity: 0.6,
    },
    loading,
  }), [loading]);

  const miniColumnConfig = useMemo(() => ({
    data: miniColumnData,
    height: 50,
    padding: 0,
    xField: 'index',
    yField: 'value',
    color: '#1890ff',
    style: {
      maxWidth: 16,
      radius: 4,
    },
    meta: {
      value: {
        min: 0,
      },
    },
    loading,
  }), [loading]);

  const tabItems = useMemo(() => [
    { key: '1', label: '销售额', children: null },
    { key: '2', label: '访问量', children: null },
  ], []);

  const getMiniChart = (type) => {
    if (type === 'area') {
      return <Tiny.Area {...miniAreaConfig} style={{ height: 40 }} />;
    }
    if (type === 'column') {
      console.log(miniColumnConfig,'miniColumnConfig');
      
      return <Tiny.Column {...miniColumnConfig} style={{ height: 40 }} />;
    }
    return null;
  };

  return {
    loading,
    salesConfig,
    pieConfig,
    salesPieConfig,
    barConfig,
    liquidConfig,
    miniAreaConfig,
    miniColumnConfig,
    tabItems,
    getMiniChart,
    statCardsData,
    salesRankColumns,
    salesRankData,
    storeColumns,
    storeData,
  };
};
