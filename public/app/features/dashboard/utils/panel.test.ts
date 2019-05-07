import { TimeRange } from '@grafana/ui';
import { applyPanelTimeOverrides } from 'app/features/dashboard/utils/panel';
import { advanceTo, clear } from 'jest-date-mock';
import { dateTimeType, DateTimeType } from '@grafana/ui/src/utils/moment_wrapper';

const dashboardTimeRange: TimeRange = {
  from: dateTimeType([2019, 1, 11, 12, 0]),
  to: dateTimeType([2019, 1, 11, 18, 0]),
  raw: {
    from: 'now-6h',
    to: 'now',
  },
};

describe('applyPanelTimeOverrides', () => {
  const fakeCurrentDate = dateTimeType([2019, 1, 11, 14, 0, 0]).toDate();

  beforeAll(() => {
    advanceTo(fakeCurrentDate);
  });

  afterAll(() => {
    clear();
  });

  it('should apply relative time override', () => {
    const panelModel = {
      timeFrom: '2h',
    };

    // @ts-ignore: PanelModel type incositency
    const overrides = applyPanelTimeOverrides(panelModel, dashboardTimeRange);

    expect(overrides.timeRange.from.toISOString()).toBe(dateTimeType([2019, 1, 11, 12]).toISOString());
    expect(overrides.timeRange.to.toISOString()).toBe(fakeCurrentDate.toISOString());
    expect(overrides.timeRange.raw.from).toBe('now-2h');
    expect(overrides.timeRange.raw.to).toBe('now');
  });

  it('should apply time shift', () => {
    const panelModel = {
      timeShift: '2h',
    };

    const expectedFromDate = dateTimeType([2019, 1, 11, 10, 0, 0]).toDate();
    const expectedToDate = dateTimeType([2019, 1, 11, 16, 0, 0]).toDate();

    // @ts-ignore: PanelModel type incositency
    const overrides = applyPanelTimeOverrides(panelModel, dashboardTimeRange);

    expect(overrides.timeRange.from.toISOString()).toBe(expectedFromDate.toISOString());
    expect(overrides.timeRange.to.toISOString()).toBe(expectedToDate.toISOString());
    expect((overrides.timeRange.raw.from as DateTimeType).toISOString()).toEqual(expectedFromDate.toISOString());
    expect((overrides.timeRange.raw.to as DateTimeType).toISOString()).toEqual(expectedToDate.toISOString());
  });

  it('should apply both relative time and time shift', () => {
    const panelModel = {
      timeFrom: '2h',
      timeShift: '2h',
    };

    const expectedFromDate = dateTimeType([2019, 1, 11, 10, 0, 0]).toDate();
    const expectedToDate = dateTimeType([2019, 1, 11, 12, 0, 0]).toDate();

    // @ts-ignore: PanelModel type incositency
    const overrides = applyPanelTimeOverrides(panelModel, dashboardTimeRange);

    expect(overrides.timeRange.from.toISOString()).toBe(expectedFromDate.toISOString());
    expect(overrides.timeRange.to.toISOString()).toBe(expectedToDate.toISOString());
    expect((overrides.timeRange.raw.from as DateTimeType).toISOString()).toEqual(expectedFromDate.toISOString());
    expect((overrides.timeRange.raw.to as DateTimeType).toISOString()).toEqual(expectedToDate.toISOString());
  });
});
