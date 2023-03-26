
<style>
    .datepicker {
  font-family: Arial, sans-serif;
  display: inline-block;
  position: relative;
  width: 250px;
}

.input-container {
  position: relative;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  color: #555;
}

input[type="text"] {
  width: 100%;
  padding: 10px 35px 10px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #555;
  box-sizing: border-box;
  cursor: pointer;
}

input[type="text"]:hover {
  border-color: #aaa;
}

i.fa {
  position: absolute;
  top: 14px;
  right: 10px;
  font-size: 16px;
  color: #999;
}

.calendar-container {
  position: absolute;
  top: 45px;
  left: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: none;
  z-index: 1000;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  background-color: #eee;
  padding: 5px;
}

.calendar-header-item {
  flex: 1;
  text-align: center;
  font-size: 16px;
  color: #555;
}

.calendar-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 1px;
  padding: 5px;
}

:global(.calendar-cell) {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #555;
  background-color: #fff;
  height: 30px;
  cursor: pointer;
}

:global(.calendar-cell:hover) {
  background-color: #eee;
}

:global(.calendar-cell.selected) {
  background-color: #3f51b5;
  color: #fff;
}

