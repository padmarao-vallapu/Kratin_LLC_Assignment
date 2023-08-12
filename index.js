// Define an array to store the appointment data
let appointments = [];
// Get the input elements
const nameInput = document.getElementById('name');
const numberInput = document.getElementById('number');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');

// Get the appointment list element
const appointmentList = document.getElementById('appointment-list');
// Function to add a new appointment
function addAppointment() {
    // Get the name and number inputs
    const name = nameInput.value;
    const number = numberInput.value;
    const date = dateInput.value;
    const time = timeInput.value;

    // Create a new appointment object with default status and time
    const appointment = {
        id: appointments.length + 1,
        doctorName: "Dr. John Doe",
        status: "Pending",
        date: date,
        time: time,

        patientName: name,
        patientNumber: number
    };

    // Add the appointment to the appointments array
    appointments.push(appointment);
    if (name === "") {
        alert("please fill the form");
        return false;
    }
    if (number === "" && number.length !== 10) {
        alert("please fill the form");
        return false;
    }

    // Clear the input fields
    nameInput.value = "";
    numberInput.value = "";
    dateInput.value = "";
    timeInput.value = "";

    // Update the appointment list
    updateAppointmentList();
}

// Function to delete an appointment
function deleteAppointment(id) {
    // Find the appointment with the specified id
    const index = appointments.findIndex(appointment => appointment.id === id);

    // Remove the appointment from the appointments array
    appointments.splice(index, 1);

    // Update the appointment list
    updateAppointmentList();
}

// Function to update the status of an appointment
function updateAppointmentStatus(id, status) {
    // Find the appointment with the specified id
    const appointment = appointments.find(appointment => appointment.id === id);

    // Update the status of the appointment
    appointment.status = status;

    // Update the appointment list
    updateAppointmentList();

    // Alert the user if the status has changed to "Confirmed"
    if (status === "Confirmed") {
        alert(`Appointment ${id} has been confirmed!`);
    }
}

// Function to update the appointment list
function updateAppointmentList() {
    // Clear the appointment list
    appointmentList.innerHTML = "";

    // Loop through the appointments array and create a list item for each appointment
    for (const appointment of appointments) {
        const listItem = document.createElement('li');

        // Display the appointment data
        const data = `${appointment.id} -- ${appointment.doctorName} -- ${appointment.patientName} -- (${appointment.patientNumber}) - ${appointment.status}`;
        listItem.innerText = data;

        // Create buttons to delete and update the status of the appointment
        const deleteButton = document.createElement('button');
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener('click', () => {
            deleteAppointment(appointment.id);
        });

        const confirmButton = document.createElement('button');
        confirmButton.innerText = "Confirm";
        confirmButton.addEventListener('click', () => {

            updateAppointmentStatus(appointment.id, "Confirmed");
        });

        const cancelButton = document.createElement('button');
        cancelButton.innerText = "Cancel";
        cancelButton.addEventListener('click', () => {
            updateAppointmentStatus(appointment.id, "Canceled");
        });

        // Add the buttons to the list item
        listItem.appendChild(deleteButton);
        listItem.appendChild(confirmButton);
        listItem.appendChild(cancelButton);

        // Add the list item to the appointment list
        appointmentList.appendChild(listItem);
    }
}

// Get the add button element and add an event listener
const addButton = document.getElementById('add-button');
addButton.addEventListener('click', addAppointment);
