document.addEventListener("DOMContentLoaded", function() {
    const newYearEl = document.getElementById("date");
    const yearsEl = document.getElementById("years");
    const monthsEl = document.getElementById("months");
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minsEl = document.getElementById("mins");
    const secondsEl = document.getElementById("seconds");
    
    const yearsElCurr = yearsEl.getElementsByClassName("curr");
    const yearsElNext = yearsEl.getElementsByClassName("next");
    const monthsElCurr = monthsEl.getElementsByClassName("curr");
    const monthsElNext = monthsEl.getElementsByClassName("next");
    const daysElCurr = daysEl.getElementsByClassName("curr");
    const daysElNext = daysEl.getElementsByClassName("next");
    const hoursElCurr = hoursEl.getElementsByClassName("curr");
    const hoursElNext = hoursEl.getElementsByClassName("next");
    const minsElCurr = minsEl.getElementsByClassName("curr");
    const minsElNext = minsEl.getElementsByClassName("next");
    const secondsElCurr = secondsEl.getElementsByClassName("curr");
    const secondsElNext = secondsEl.getElementsByClassName("next");
    
    const newYear = new Date().getFullYear() + 1;
    let newYearTime = new Date("2033-01-01T00:00:00"); // La hora ya está en la zona horaria de Bélgica
  
    function updateAllCountdowns() {
        const dates = {
            current: {
                elements: [daysElCurr, hoursElCurr, minsElCurr, secondsElCurr, yearsElCurr, monthsElCurr],
                values: ["00", "00", "00", "00"]
            },
            next: {
                elements: [daysElNext, hoursElNext, minsElNext, secondsElNext, yearsElNext, monthsElNext],
                values: ["00", "00", "00", "00"]
            },
            general: {
                elements: [daysEl, hoursEl, minsEl, secondsEl, yearsEl, monthsEl]
            }
        };
        const currentDate = new Date();
        updateCountdown(dates.current, currentDate, true);
        const nextDate = new Date(
            currentDate.setSeconds(currentDate.getSeconds() + 1)
        );
        updateCountdown(dates.next, nextDate, false);
        for (let i = 0; i < dates.current.values.length; i++) {
            if (dates.current.values[i] - dates.next.values[i] !== 0) {
                dates.general.elements[i].classList.remove("flip");
            }
            setTimeout(function () {
                dates.general.elements[i].classList.add("flip");
            }, 50);
        }
    }
  
    function updateCountdown(dates, currentTime, isCurrent) {
        const totalSeconds = Math.floor((newYearTime - currentTime) / 1000);
  
        // Calcular años, meses, días, horas, minutos y segundos restantes
        let years = Math.floor(totalSeconds / (3600 * 24 * 365));
        const remainingSeconds = totalSeconds % (3600 * 24 * 365);
        let months = Math.floor(remainingSeconds / (3600 * 24 * 30.44));
        let days = Math.floor(remainingSeconds / (3600 * 24));
        const hours = Math.floor((remainingSeconds % (3600 * 24)) / 3600);
        const mins = Math.floor((remainingSeconds % 3600) / 60);
        const seconds = Math.floor(remainingSeconds % 60);
  
        // Ajustar años restantes
        const currentYear = currentTime.getFullYear();
        const newYearYear = newYearTime.getFullYear();
        const currentMonth = currentTime.getMonth();
        const newYearMonth = newYearTime.getMonth();
        const currentDate = currentTime.getDate();
        const newYearDate = newYearTime.getDate();
  
        if (currentMonth > newYearMonth || (currentMonth === newYearMonth && currentDate > newYearDate)) {
            // Si la fecha actual es después del año nuevo, ajusta la cantidad de años restantes
            years = newYearYear - currentYear - 1;
            if (currentMonth < newYearMonth || (currentMonth === newYearMonth && currentDate <= newYearDate)) {
                years += 1;
            }
        } else {
            years = newYearYear - currentYear;
        }
  
        // Ajustar meses restantes
        if (currentMonth > newYearMonth || (currentMonth === newYearMonth && currentDate > newYearDate)) {
            // La fecha actual es después del año nuevo
            months = 12 - currentMonth + newYearMonth;
            if (currentDate > newYearDate) {
                months -= 1;
            }
        } else {
            // La fecha actual es antes del año nuevo
            months = newYearMonth - currentMonth;
            if (currentDate > newYearDate) {
                months += 1;
            }
        }
  
        // Ajustar días restantes
        if (currentDate > newYearDate) {
            const daysInNewMonth = daysInMonth(newYearMonth);
            const daysOverflow = currentDate - newYearDate;
            days = daysInNewMonth - daysOverflow;
        } else {
            days = newYearDate - currentDate;
        }
  
        // Renderizar los valores en el DOM
        dates.values = [
            days,
            formatTime(hours),
            formatTime(mins),
            formatTime(seconds),
            years,
            months
        ];
  
        for (let i = 0; i < dates.elements.length; i++) {
            for (let j = 0; j < dates.elements[i].length; j++) {
                dates.elements[i][j].innerHTML = dates.values[i];
            }
        }
    }
  
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
  
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }
  
    function daysInMonth(month) {
        // Devuelve la cantidad de días en un mes específico
        switch (month) {
            case 0: // Enero
            case 2: // Marzo
            case 4: // Mayo
            case 6: // Julio
            case 7: // Agosto
            case 9: // Octubre
            case 11: // Diciembre
                return 31;
            case 1: // Febrero
                return 28; // Se asume no bisiesto
            default:
                return 30;
        }
    }
  
    updateAllCountdowns();
    setInterval(updateAllCountdowns, 1000);
});
