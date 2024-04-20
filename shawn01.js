class Elevator {
    constructor(capacity) {
        this.capacity = capacity;
        this.currentFloor = 1;
        this.targetFloor = 1;
        this.peopleInside = [];
        this.busy = false;
    }

    moveToFloor(floor) {
        this.busy = true;
        setTimeout(() => {
            this.currentFloor = floor;
            this.openDoor();
        }, Math.abs(floor - this.currentFloor) * 1000);
    }

    openDoor() {
        console.log(`Elevator opened at floor ${this.currentFloor}`);
        setTimeout(() => {
            this.closeDoor();
        }, 1000);
    }

    closeDoor() {
        console.log(`Elevator closed at floor ${this.currentFloor}`);
        if (this.peopleInside.length > 0) {
            this.removePerson();
        } else {
            this.busy = false;
        }
    }

    addPerson() {
        if (this.peopleInside.length < this.capacity) {
            this.peopleInside.push('Person');
            console.log('Person entered elevator');
        }
    }

    removePerson() {
        this.peopleInside.pop();
        console.log('Person left elevator');
        if (this.peopleInside.length > 0) {
            this.removePerson();
        } else {
            this.busy = false;
        }
    }

    isFull() {
        return this.peopleInside.length === this.capacity;
    }

    isEmpty() {
        return this.peopleInside.length === 0;
    }

    isBusy() {
        return this.busy;
    }
}

class Building {
    constructor(floors, elevatorNum) {
        this.floors = floors;
        this.elevatorArr = [];
        for (let i = 0; i < elevatorNum; i++) {
            this.elevatorArr.push(new Elevator(5)); // 每部电梯容纳5人
        }
        this.peopleWaiting = [];
        this.totalPeople = 0;
    }

    createPerson() {
        const startFloor = Math.floor(Math.random() * this.floors) + 1;
        let targetFloor = Math.floor(Math.random() * this.floors) + 1;
        while (targetFloor === startFloor) {
            targetFloor = Math.floor(Math.random() * this.floors) + 1;
        }
        this.peopleWaiting.push({ startFloor, targetFloor });
        this.totalPeople++;
    }

    assignElevator(person) {
        console.log(person)
        const elevator = this.elevatorArr.find(elevator => !elevator.isBusy());
        if (elevator) {
            elevator.addPerson();
            elevator.moveToFloor(person.startFloor);
        }
    }

    simulate() {
        const simulationInterval = setInterval(() => {
            if (this.totalPeople < 40) {
                this.createPerson();
            } else if (this.totalPeople === 40 && this.peopleWaiting.length === 0) {
                clearInterval(simulationInterval);
                console.log('Simulation ended.');
            }

            this.peopleWaiting.forEach(person => {
                this.assignElevator(person);
                const index = this.peopleWaiting.indexOf(person);
                if (index > -1) {
                    this.peopleWaiting.splice(index, 1);
                }
            });
        }, 1000);
    }

    printStatus() {
        console.log('Building status:');
        console.log(`Total people waiting: ${this.peopleWaiting.length}`);
        console.log(`Total people served: ${this.totalPeople}`);
        console.log(`Elevators: ${this.elevatorArr.length}`);
    }
}

const building = new Building(10, 2); // 10层楼，2部电梯
building.simulate();
