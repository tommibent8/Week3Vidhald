import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {getCurrentYear, add, isWithinRange, isDateBefore, isSameDay, isHoliday, getHolidays} from "../dateUtils";
import * as dateUtils from "../dateUtils";

describe("Date Utils", () => {
  // Add your tests here
  /*it.todo("replace with your own tests");*/
  
  describe("getCurrentYear", () => {

    // Freeze system time so the test works in differnet years
    beforeEach(() =>{
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2026,0,1));
    });
    
    it("returns the current year", () => {
      let currentYearTest = 2026; 
      expect(getCurrentYear()).toBe(currentYearTest);
    });

    // Restore real timers to avoid affecting other tests
    afterEach(()=> {
      vi.useRealTimers();
    })
    
  });

  describe("add", () => {
    it("add adds days to a date", () => {
      const date = new Date(2026, 1, 1);
      const days = 5;
      expect(add(date, days, "days")).toEqual(new Date(2026, 1, 6));
    });

    it("throws when date is invalid", () => {
      const badDate = "not a date";
      expect(() => add(badDate, 5, 'days')).toThrow();
    });

    it("throws when amount is not a number", () => {
      const date = new Date(2026, 1, 1);
      const amount = "d";
      expect(() => add(date, amount, 'days')).toThrow();
    });
  })

  describe("isWithinRange", () => {
    it("isWithinRange works for valid ranges", () => {
      const date = new Date(2026, 1, 15);
      const from = new Date(2026, 1, 1);
      const to = new Date(2026, 2, 1);
      
      expect(isWithinRange(date, from, to)).toEqual(true);
    });

    it("throws when from date is after the to date", () => {
      const date = new Date(2026, 2, 27);
      const from = new Date(2026, 2, 1);
      const to = new Date(2026, 1, 1);
      expect(() =>
          isWithinRange( date,from ,to)
      ).toThrow();
    });

  });

  describe("isDateBefore", () => {
    it("returns true when date is before compareDate", () => {
      const date = new Date(2026, 1, 1);
      const compareDate = new Date(2026, 1, 2);

      expect(isDateBefore(date, compareDate)).toEqual(true);
    });

    it("returns false when date is after compareDate", () => {
      const date = new Date(2026, 1, 3);
      const compareDate = new Date(2026, 1, 2);

      expect(isDateBefore(date, compareDate)).toEqual(false);
    });
  });

  describe("isSameDay", () => {
    it("returns true for dates on the same calendar day", () => {
      const morning = new Date(2026, 1, 1, 8, 0);
      const evening = new Date(2026, 1, 1, 20, 0);

      expect(isSameDay(morning, evening)).toEqual(true);
    });

    it("returns false for different days", () => {
      const date1 = new Date(2026, 1, 1);
      const date2 = new Date(2026, 1, 2);

      expect(isSameDay(date1, date2)).toEqual(false);
    });
  });

  describe("getHolidays", () => {
    it("returns holidays for a given year", async () => {
      const holidays = await getHolidays(2026);
      expect(holidays.length).toEqual(3);
      expect(holidays[0]).toEqual(new Date(2026, 0, 1));
    });
  });

  describe("isHoliday", () => {
    it("returns true when date is a holiday", async () => {
      vi.spyOn(dateUtils, 'getHolidays').mockResolvedValue([
        new Date(2026, 11, 25)
      ]);

      const date = new Date(2026, 11, 25);
      expect(await isHoliday(date)).toEqual(true);
    });

    it("returns false when date is not a holiday", async () => {
      vi.spyOn(dateUtils, 'getHolidays').mockResolvedValue([
        new Date(2026, 11, 25)
      ]);

      const date = new Date(2026, 11, 24);
      expect(await isHoliday(date)).toEqual(false);
    });

  });
  
  
});
