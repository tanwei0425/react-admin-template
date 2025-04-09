/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-09-06 17:39:30
 * @LastEditors: tanwei
 * @LastEditTime: 2021-03-13 15:37:15
 * @FilePath: /open-platform/src/layouts/breadcrumb.tsx
 */
// import { Breadcrumb, PageHeader } from "antd";
import { Breadcrumb } from 'antd';
// import { useLocation, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { website } from '@/config';
import _ from 'lodash';

const findParent = (menu = [], all, arr = []) => {
  menu && arr.unshift(menu);
  const parent = all.find((val) => val.id === menu?.pid);
  parent && findParent(parent, all, arr);
  return arr;
};

// const itemRender = (route) => route.href ? <Link to={route.path}>{route.breadcrumbName}</Link> : <span>{route.breadcrumbName}</span>;

const TBreadcrumb = () => {
  const location = useLocation();
  const { menusList } = useSelector((state) => state.userInfo);
  const { breadcrumb } = useSelector((state) => state.theme);
  const menusListData = _.cloneDeep(menusList);
  const allPathname = Object.fromEntries(
    menusListData.map((menu) => [menu.path, menu])
  );
  const targetMenuList = findParent(
    allPathname[location.pathname],
    menusListData
  );
  // let routes = [];

  // if (!navigationMode?.breadcrumb) {
  //   routes = targetMenuList.map((val, index) => {
  //     val.breadcrumbName = val.name;
  //     // 第一个面包屑、最后一个面包屑和栏目的面包屑不能点击
  //     index !== 0 && targetMenuList.length - 1 !== index && val.isRouter === '1' && (val.href = true);
  //     return _.pick(val, ['breadcrumbName', 'path', 'href']);
  //   });
  // }
  return (
    <div>
      <Helmet>
        {allPathname[location.pathname]?.name ? (
          <title>
            {allPathname[location.pathname]?.name} - {website.title}
          </title>
        ) : (
          <title>{website.title}</title>
        )}
      </Helmet>
      {breadcrumb ? (
        <div>
          <Breadcrumb
            items={targetMenuList.map((val) => ({ title: val.name }))}
          />
        </div>
      ) : (
        <div>
          {/* <PageHeader
          ghost={false}
          title={Array.isArray(routes) && routes.length > 0 && routes[routes?.length - 1]?.breadcrumbName}
          breadcrumb={{ routes, itemRender }}
        /> */}
        </div>
      )}
    </div>
  );
};

export default TBreadcrumb;
