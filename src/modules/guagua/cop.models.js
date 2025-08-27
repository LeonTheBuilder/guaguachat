const a = require('aframework');
const db = a.db;
const DataTypes = a.models.DataTypes;
// --------------------------------------------------------------------------------
const TradeDay = db.define('TradeDay',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
    },
    {
        tableName: 'cop_trade_day',
        freezeTableName: true,
        charset: 'utf8mb4',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);


const Strategy = db.define('Strategy',
    {
        id: {
            type: DataTypes.STRING(25),
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        prompts: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        dataFetchConfig: {
            type: DataTypes.JSON,
            allowNull: true,
        }
    },
    {
        tableName: 'cop_strategy',
        freezeTableName: true,
        charset: 'utf8mb4',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);


const StrategyReport = db.define('StrategyReport',
    {
        id: {
            type: DataTypes.STRING(25),
            allowNull: false,
            primaryKey: true,
        },
        strategyId: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        sifStatus: {
            type: DataTypes.STRING(1),
            allowNull: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'cop_strategy_report',
        freezeTableName: true,
        charset: 'utf8mb4',
        timestamps: true,
        updatedAt: true,
    }
);

const Mark = db.define('Mark',
    {
        id: {
            type: DataTypes.STRING(100),
            allowNull: false,
            primaryKey: true,
        },
    },
    {
        tableName: 'cop_mark',
        freezeTableName: true,
        charset: 'utf8mb4',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);

const CopData = db.define('CopData',
    {
        id: {
            type: DataTypes.STRING(25),
            allowNull: false,
            primaryKey: true,
        },
        type: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        tradeDay: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        value: {
            type: DataTypes.JSON,
            allowNull: true,
        }
    },
    {
        tableName: 'cop_data',
        freezeTableName: true,
        charset: 'utf8mb4',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        indexes: [
            {
                unique: false,
                fields: ['type'],
            }
        ]
    }
);

// --------------------------------------------------------------------------------
module.exports = {
    TradeDay,
    CopData,
    Mark,
    Strategy,
    StrategyReport,
};
