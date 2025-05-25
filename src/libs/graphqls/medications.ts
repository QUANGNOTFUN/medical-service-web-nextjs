import { GraphQLClient } from "graphql-request";
import {CreateMedicationInput, Medication, UpdateMedicationInput} from "@/types/medications";

const graphqlEndpoint = "http://localhost:3000/graphql";

export const graphQLClient = new GraphQLClient(graphqlEndpoint, {
	headers: {},
});

export async function getMedications() {
	const query = `
    query {
      medications {
        id
        acronym
        name
        price
        available_quantity
      }
    }
  `;
	const data = await graphQLClient.request<{ medications: Medication[] }>(query);
	return data.medications;
}

export async function getMedication(id: number) {
	const query = `
    query {
      medication(id: ${id}) {
        id
        acronym
        name
        price
        available_quantity
      }
    }
	`;
	const data = await graphQLClient.request<{ medication: Medication }>(query);
	return data.medication;
}

export async function createMedication(input: CreateMedicationInput) {
	const query = `
    mutation {
      createMedication(input: ${JSON.stringify(input)}) {
        id
        acronym
        name
        price
        available_quantity
        }
        }
	`;
	const data = await graphQLClient.request<{ createMedication: Medication }>(query);
	return data.createMedication;
}

export async function updateMedication(input: UpdateMedicationInput) {
	const query = `
    mutation {
      updateMedication(input: ${JSON.stringify(input)}) {
        id
        acronym
        name
        price
        available_quantity
        }
        }
	`;
	const data = await graphQLClient.request<{ updateMedication: Medication }>(query);
	return data.updateMedication;
}