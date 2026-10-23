import { useState } from "react";
import "./App.css";

function App() {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState(null);
  const [error, setError] = useState("");

  const today = new Date();

  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const calculateAge = () => {
    if (!dob) {
      setError("Please select your date of birth.");
      setAge(null);
      return;
    }

    const birthDate = new Date(`${dob}T00:00:00`);
    const currentDate = new Date();

    if (birthDate > currentDate) {
      setError("Date of birth cannot be in the future.");
      setAge(null);
      return;
    }

    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;

      const previousMonthDays = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      ).getDate();

      days += previousMonthDays;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    setAge({
      years,
      months,
      days,
      weekday: weekdays[birthDate.getDay()],
    });

    setError("");
  };

  return (
    <main className="age-page">
      <section className="age-card">
        <h1>Evaluate Current Age</h1>

        <div className="form-row">
          <label htmlFor="dob">Enter your Date of Birth</label>

          <input
            id="dob"
            type="date"
            value={dob}
            max={todayString}
            onChange={(e) => {
              setDob(e.target.value);
              setAge(null);
              setError("");
            }}
          />
        </div>

        <div className="date-info">
          <span>System Date</span>
          <strong>
            {today.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </strong>
        </div>

        <button onClick={calculateAge}>Find Present Age</button>

        {error && <p className="error">{error}</p>}

        {age && (
          <div className="result">
            <h2>Your Present Age</h2>

            <div className="age-numbers">
              <div>
                <strong>{age.years}</strong>
                <span>Years</span>
              </div>

              <div>
                <strong>{age.months}</strong>
                <span>Months</span>
              </div>

              <div>
                <strong>{age.days}</strong>
                <span>Days</span>
              </div>
            </div>

            <p>
              <strong>Day of Birth:</strong> {age.weekday}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;