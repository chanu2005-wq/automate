import React from 'react';

const StatCard = ({ title, value, icon, change, isPositive }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-amber-500">{icon}</span>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <span className={isPositive ? 'text-green-600' : 'text-red-600'}>{change}</span>
          <span className="text-gray-500 ml-2">from last month</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
