// import dataset from './students.json';
import dataset from './dataset1.json';
import dataset2 from './dataset2.json';
import dataset3 from './dataset3.json';

export default{
  data: { dataset }
}

export const Config1 = {
  data: { dataset: {...dataset2} }
}

export const Config2 = {
  data: { dataset: {...dataset3} }
}
