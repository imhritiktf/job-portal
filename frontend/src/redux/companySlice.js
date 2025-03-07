import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singalCompany: null,
        companies:[],
        searchCompanyByText:""
    },
    reducers: {
        setSingleCompany(state, action) {
            state.singalCompany = action.payload;
        },
        setCompanies(state,action){
            state.companies = action.payload;
        },
        setSearchCompanyText(state,action){
            state.searchCompanyByText = action.payload
        }
    }
})

export const {setSingleCompany,setCompanies, setSearchCompanyText} = companySlice.actions
export default companySlice.reducer;