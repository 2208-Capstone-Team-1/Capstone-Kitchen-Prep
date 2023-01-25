const lastName: string = "lena";

const number1: number = 23;

type Object1 = {
  name: string;
  age: number;
  sports?: string[];
};

const StatusInfo: Object1 = {
  name: "lena",
  age: 40,
  sports: ["soccer"],
};

const AntonInfo: Object1 = {
  name: "anton",
  age: 25,
};

interface Object2 {
  name: string;
  age: number;
  hobby?: string[];
}

const steveInfo: Object2 = {
  name: "steve",
  age: 24,
};
