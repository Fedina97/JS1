// debugger;

const config = {
    rowsCount: 10,
    colsCount: 10,
};

let renderer = {
    map: '',
    //Отображение игры в консоли
    render() {
        for (let row = 0; row < config.rowsCount; row++) {
            for (let col = 0; col < config.colsCount; col++) {
                if (player.y === row && player.x === col) {
                    this.map += 'o ';
                } else {
                    this.map += 'x ';
                }
            }
            this.map += '\n';
        }
        console.log(this.map);
    },

    clear() {
        console.clear();
        this.map = '';
    }
};

let mover = {
    //направление пользователя
    getDirection() {
        const availableDirections = [1, 2, 3, 4, 6, 7, 8, 9];
        while (true) {
            let direction = parseInt(prompt('Введите число 1, 2, 3, 4, 6, 7, 8, 9, куда хотите переместиться, "Отмена" для выхода '));
            if (isNaN(direction)) {
                return null;
            }
            if (!availableDirections.includes(direction)) {
                alert('Необходимо ввести 1, 2, 3, 4, 6, 7, 8, 9');
                continue;
            }
            return direction;
        }
    },

    getNextPosition(direction) {
        const nextPosition = {
            x: player.x,
            y: player.y
        };
        switch (direction) {
            case 1:
                this.canMakeStep(nextPosition, nextPosition.x--, nextPosition.y++);
                break;
            case 2:
                this.canMakeStep(nextPosition, nextPosition.x, nextPosition.y++);
                break;
            case 3:
                this.canMakeStep(nextPosition, nextPosition.x++, nextPosition.y++);
                break;
            case 4:
                this.canMakeStep(nextPosition, nextPosition.x--, nextPosition.y);
                break;
            case 6:
                this.canMakeStep(nextPosition, nextPosition.x++, nextPosition.y);
                break;
            case 7:
                this.canMakeStep(nextPosition, nextPosition.x--, nextPosition.y--);
                break;
            case 8:
                this.canMakeStep(nextPosition, nextPosition.x, nextPosition.y--);
                break;
            case 9:
                this.canMakeStep(nextPosition, nextPosition.x++, nextPosition.y--);
                break;
        }
        return nextPosition;
    },

    canMakeStep(nextPosition, nextPositionX, nextPositionY) {
        if (nextPosition.x < 0 || nextPosition.x >= 10 || nextPosition.y < 0 || nextPosition.y >= 10) {
            nextPosition.x = nextPositionX;
            nextPosition.y = nextPositionY;

        }
    }

};



const player = {
    x: 0,
    y: 0,

    move(nextPoint) {
        this.x = nextPoint.x;
        this.y = nextPoint.y;
    },
};

let game = {

    //запуск игры
    run() {
        while (true) {
            const direction = mover.getDirection();
            if (direction === null) {
                console.log('Игра окончена');
                return;
            }
            const nextPoint = mover.getNextPosition(direction);
            renderer.clear();
            player.move(nextPoint);
            // if (player.move(nextPoint) === undefined) {
            //     alert('Вы вышли за пределы поля');
            // }
            console.log(mover.getNextPosition(direction));
            renderer.render();
        }
    },

    //начальная настройка
    init() {
        console.log('Ваше положение на поле в виде О');
        renderer.render();
        console.log('Чтоб запустить игру наберите game.run() и нажмите Enter');
    }
};

game.init();