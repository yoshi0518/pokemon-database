import { DatePickerInput, DatePickerInputProps, DayOfWeek } from '@mantine/dates';
import { ComponentPropsWithRef, forwardRef, FC } from 'react';
import { ChangeHandler } from 'react-hook-form';

import classes from './NaRhfDateInput.module.scss';

import 'dayjs/locale/ja';

/**
 * @field variant 種類
 * @field size サイズ
 * @field round 角丸
 * @field withAsterisk 必須
 * @field disabled 無効
 * @field label ラベル
 * @field description 説明
 * @field dropdownType カレンダー表示方法
 * @field clearable 日付クリア
 * @field valueFormat 日付表示書式
 * @field monthLabelFormat 月表示書式
 * @field monthsListFormat 月リスト表示書式
 * @field yearLabelFormat 年表示書式
 * @field firstDayOfWeek 週の始めの曜日
 * @field weekendDays 休みの曜日
 * @field minDate 選択可能な最小日付
 * @field maxDate 選択可能な最大日付
 * @field error エラー
 * @field onChange 変更時イベント
 * @see https://mantine.dev/dates/date-picker-input/
 */
export type NaRhfDateInputProps = Omit<ComponentPropsWithRef<'button'>, 'size' | 'value' | 'onChange'> &
  Omit<DatePickerInputProps, 'variant' | 'size' | 'onChange'> & {
    variant?: 'default' | 'filled' | 'unstyled';
    size?: 'default' | 'small' | 'large';
    round?: boolean;
    onChange: ChangeHandler;
  };

const getSize = (size: string) => {
  switch (size) {
    case 'default':
      return 'sm';
    case 'small':
      return 'xs';
    case 'large':
      return 'md';
    default:
      return 'sm';
  }
};

/** NaRhfDateInput(共通UI) */
export const NaRhfDateInput: FC<NaRhfDateInputProps> = forwardRef(
  (
    {
      variant = 'default',
      size = 'default',
      round = false,
      withAsterisk = false,
      disabled = false,
      label = '',
      description = '',
      dropdownType = 'popover',
      clearable = true,
      valueFormat = 'YYYY-MM-DD',
      monthLabelFormat = 'YYYY年M月',
      monthsListFormat = 'M月',
      yearLabelFormat = 'YYYY年',
      firstDayOfWeek = 0,
      weekendDays = [0] as DayOfWeek[],
      minDate = undefined,
      maxDate = undefined,
      error = '',
      className = '',
      name,
      onChange,
    },
    ref,
  ) => (
    <div className={className}>
      <DatePickerInput
        variant={variant}
        size={getSize(size)}
        radius={round ? 'xl' : ''}
        withAsterisk={withAsterisk}
        disabled={disabled}
        label={label}
        description={description}
        dropdownType={dropdownType}
        clearable={clearable}
        valueFormat={valueFormat}
        monthLabelFormat={monthLabelFormat}
        monthsListFormat={monthsListFormat}
        yearLabelFormat={yearLabelFormat}
        firstDayOfWeek={firstDayOfWeek}
        weekendDays={weekendDays}
        minDate={minDate}
        maxDate={maxDate}
        locale="ja"
        error={error}
        leftSection={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="-ml-0.5 h-5 w-5">
            <path
              fill="currentColor"
              d="M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z"
            />
          </svg>
        }
        classNames={{
          input: classes.input,
          error: classes.error,
        }}
        name={name}
        onChange={(value) => {
          onChange({ target: { name, value } });
        }}
        ref={ref}
      />
    </div>
  ),
);
