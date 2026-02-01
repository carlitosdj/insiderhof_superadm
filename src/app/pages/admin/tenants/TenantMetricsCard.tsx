import React from "react";
import { KTIcon } from "../../../../_metronic/helpers";

interface TenantMetricsCardProps {
  title: string;
  value: number | string;
  icon: string;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const TenantMetricsCard: React.FC<TenantMetricsCardProps> = ({
  title,
  value,
  icon,
  color = 'primary',
  subtitle,
  trend,
}) => {
  return (
    <div className="card card-flush h-100">
      <div className="card-header pt-5">
        <div className="card-title d-flex flex-column">
          <span className="text-gray-400 pt-1 fw-semibold fs-6">{title}</span>
          <span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">{value}</span>
          {subtitle && (
            <span className="text-gray-400 pt-1 fw-semibold fs-7">{subtitle}</span>
          )}
        </div>
      </div>

      <div className="card-body d-flex align-items-end pt-0">
        <div className="d-flex align-items-center flex-column mt-3 w-100">
          <div className="d-flex justify-content-between fw-bold fs-6 text-gray-400 w-100 mt-auto mb-2">
            <span>
              {trend && (
                <span className={`badge badge-light-${trend.isPositive ? 'success' : 'danger'} fs-8`}>
                  <KTIcon
                    iconName={trend.isPositive ? 'arrow-up' : 'arrow-down'}
                    className="fs-7"
                  />
                  {Math.abs(trend.value)}%
                </span>
              )}
            </span>
            <span>
              <KTIcon iconName={icon} className={`fs-2x text-${color}`} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantMetricsCard;
